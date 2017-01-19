import { Component, OnInit, OnDestroy, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActionSheetController, LoadingController } from 'ionic-angular';

import { Client } from '../../../common/services/api/client';
import { ChannelComponent } from '../../channel/channel.component';
import { Storage } from '../../../common/services/storage';
import { AttachmentService } from '../../attachments/attachment.service';

@Component({
  moduleId: 'module.id',
  selector: 'newsfeed-poster',
  templateUrl: 'poster.component.html',
  //changeDetection: ChangeDetectionStrategy.OnPush
})

export class PosterComponent {

  entity;

  minds = {
    cdn_url: 'https://edge.minds.com/'
  }

  components = {
    channel: ChannelComponent
  }

  message : string = "";

  storage = new Storage();

  constructor(public client : Client, public actionSheetCtrl: ActionSheetController, private attachment : AttachmentService, private loadingCtrl : LoadingController,
    private cd : ChangeDetectorRef){

  }

  openCamera(){
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Upload',
      buttons: [
        {
          text: 'Take a photo',
          icon: 'md-camera',
          handler: () => {
            this.attachment.takePicture();
          }
        },
        {
          text: 'Record a video',
          icon: 'md-videocam',
          handler: () => {
            this.attachment.takeVideo();
          }
        },
        {
          text: 'Pick from library',
          icon: 'md-image',
          handler: () => {
            this.attachment.selectFromLibrary();
          }
        },
        {
          text: 'Close',
          icon: 'md-close',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  post(){
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
    });
    loader.present();

    let data = Object.assign({
      message: this.message
    }, this.attachment.meta);

    this.client.post('api/v1/newsfeed', data)
      .then(() => {
        this.message = "";

        this.cd.markForCheck();
        this.cd.detectChanges();
        loader.dismiss();
      })
      .catch((err) => {
        loader.dismiss();
      })
  }

}
