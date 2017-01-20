import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActionSheetController, LoadingController } from 'ionic-angular';

import { Client } from '../../../common/services/api/client';
import { ChannelComponent } from '../../channel/channel.component';
import { Storage } from '../../../common/services/storage';
import { AttachmentService } from '../../attachments/attachment.service';

@Component({
  moduleId: 'module.id',
  selector: 'newsfeed-poster',
  templateUrl: 'poster.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
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
  progress : number = 0;

  meta = {
    message: '',
    attachment_guid: null
  };

  @Output('prepend') prepend : EventEmitter<any> = new EventEmitter();

  storage = new Storage();

  constructor(public client : Client, public actionSheetCtrl: ActionSheetController, public attachment : AttachmentService, private loadingCtrl : LoadingController,
    private cd : ChangeDetectorRef){

  }

  ngOnInit(){
    this.attachment.emitter.subscribe((response : any) => {
      this.progress = response.progress;
      this.meta.attachment_guid = response.guid;
      this.cd.markForCheck();
      this.cd.detectChanges();
    });
  }

  openCamera(){
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Upload',
      buttons: [
        {
          text: 'Take a photo',
          icon: 'md-camera',
          handler: () => {
            this.attachment.takePicture()
          }
        },
        {
          text: 'Record a video',
          icon: 'md-videocam',
          handler: () => {
            this.attachment.takeVideo()
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

    this.client.post('api/v1/newsfeed', this.meta)
      .then((response : any) => {
        this.meta.attachment_guid = "";
        this.meta.message = "";
        this.progress = 0;
        this.prepend.next(response.activity);
        this.cd.markForCheck();
        this.cd.detectChanges();
        loader.dismiss();
      })
      .catch((err) => {
        loader.dismiss();
      })
  }

}
