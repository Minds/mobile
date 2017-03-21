import { Component, ChangeDetectionStrategy, ChangeDetectorRef, Input, Output, EventEmitter } from '@angular/core';
import { ActionSheetController, LoadingController, ToastController } from 'ionic-angular';
import { Camera, CameraOptions, MediaCapture, MediaFile } from 'ionic-native';
import { Client } from '../../common/services/api/client';
import { CONFIG } from '../../config';

@Component({
  moduleId: 'module.id',
  selector: 'minds-banner',
  templateUrl: 'banner.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class BannerComponent {

  minds = {
    cdn_url: CONFIG.cdnUrl
  }

  edited: boolean = false;

  loader;

  entity;
  picture;
  @Input('entity') set _entity(entity: any) {
    this.entity = entity;

    if (!this.edited) {
      this.picture = this.getPictureFromEntity();
    }
  }

  @Input() editing;

  @Output() fileToUpload = new EventEmitter();

  constructor(public client: Client,
    private actionSheetCtrl: ActionSheetController,
    private cd: ChangeDetectorRef,
    private loaderCtrl: LoadingController,
    private toastCtrl: ToastController
  ) { }

  onPressAddPicture() {
    let actionSheet = this.buildActionSheet();
    actionSheet.present();
  }

  private buildActionSheet() {
    return this.actionSheetCtrl.create({
      title: 'Select from',
      buttons: [
        {
          text: 'Camera',
          icon: 'camera',
          handler: () => {
            this.callCamera();
          }
        },
        {
          text: 'Photo Library',
          icon: 'image',
          handler: () => {
            this.callImageLibrary();
          }
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            // NO-OP
          }
        }
      ]
    });
  }

  private callCamera() {
    this.showLoader();
    this.getImageFromCamera();
  }

  private callImageLibrary() {
    this.showLoader();
    this.getImageFromLibrary();
  }

  private getImageFromCamera() {
    MediaCapture.captureImage({
      limit: 1
    }).then((data: MediaFile[]) => {
      this.picture = data[0].fullPath;
      this.updateView();
      this.setUploadFile();
      this.loader.dismiss();
    }, (err) => {
      this.loader.dismiss();
    });
  }

  private getImageFromLibrary() {
    Camera.getPicture({
      correctOrientation: true,
      destinationType: Camera.DestinationType.FILE_URI,
      sourceType: 0,
      mediaType: 2
    })
      .then((fileSrc) => {
        if (this.isValidType(fileSrc)) {
          this.picture = fileSrc;
          this.updateView();
          this.setUploadFile();
        } else {
          this.showToast('Not an image');
        }
        this.loader.dismiss();
      }, (err) => {
        this.showToast(err);
      });
  }

  private isValidType(fileSrc: string): boolean {
    let imagesType = ["images", "document/image", '.jpg', '.JPG', '.jpeg', '.JPEG', '.png', '.PNG', '.bmp', '.BMP', '.gif', '.GIF'];
    for (let i = 0; i < fileSrc.length; i++) {
      if (fileSrc.indexOf(imagesType[i]) > -1) {
        return true;
      }
    }
    return false;
  }

  private updateView() {
    this.cd.markForCheck();
    this.cd.detectChanges();
  }

  private showLoader() {
    this.loader = this.loaderCtrl.create({
      content: "Loading image..."
    });
    this.loader.present();
  }

  private showToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

  setUploadFile() {
    this.edited = true;
    this.fileToUpload.emit(this.picture);
  }

  getPictureFromEntity(): string {
    if (this.entity && this.entity.carousels) {
      return this.entity.carousels[0].src;
    }

    return `${this.minds.cdn_url}fs/v1/banners/${this.entity.guid}/0/${this.entity.banner}`;
  }

  resetPicture() {
    console.log('reset');
    this.picture = this.getPictureFromEntity();
    this.updateView();
  }
}
