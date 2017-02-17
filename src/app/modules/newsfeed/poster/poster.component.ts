import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActionSheetController, LoadingController } from 'ionic-angular';

import { Client } from '../../../common/services/api/client';
import { ChannelComponent } from '../../channel/channel.component';
import { Storage } from '../../../common/services/storage';
import { AttachmentService } from '../../attachments/attachment.service';
import { WalletService } from '../../wallet/wallet.service';

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
    attachment_guid: null,
    container_guid: null
  };

  @Input() placeholder : string = "Enter your status here";

  @Input() set containerGuid(guid: any){
    this.attachment.setContainerGuid(guid);
    this.meta.container_guid = guid;
  }

  @Input() set accessId(access_id: any){
   this.attachment.setAccessId(access_id);
  }

  @Output('prepend') prepend : EventEmitter<any> = new EventEmitter();

  storage = new Storage();

  constructor(public client : Client, public actionSheetCtrl: ActionSheetController, public attachment : AttachmentService, private loadingCtrl : LoadingController,
    private wallet : WalletService, private cd : ChangeDetectorRef){

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
        if(this.meta.attachment_guid){
          this.wallet.increment(10);
        } else {
          this.wallet.increment(1);
        }

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
