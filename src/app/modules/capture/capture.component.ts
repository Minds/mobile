import { Component, OnInit, OnDestroy, Input, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { ViewController, LoadingController, ToastController, ModalController, NavParams } from 'ionic-angular';

import { Client } from '../../common/services/api/client';
import { Storage } from '../../common/services/storage';
import { AttachmentService } from '../attachments/attachment.service';
import { WalletService } from '../wallet/wallet.service';
import { BoostComponent } from '../newsfeed/boost/boost.component';

import { CONFIG } from '../../config';
import { BoostCreatorFabController } from '../boost/creator/fab';

@Component({
  moduleId: 'module.id',
  selector: 'capture',
  templateUrl: 'capture.component.html',
  //styleUrls: ['list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CaptureComponent {

  minds = {
    cdn_url: CONFIG.cdnUrl
  }

  progress : number = 0;

  meta = {
    message: '',
    attachment_guid: '',
    mature: 0,
  }

  constructor(private client : Client, private viewCtrl : ViewController, public attachment : AttachmentService, private loadingCtrl : LoadingController,
    private toastCtrl: ToastController, private modalCtrl : ModalController, private storage : Storage, private cd : ChangeDetectorRef,
    private wallet : WalletService, private params : NavParams, private boostFab : BoostCreatorFabController){

  }

  ngOnInit(){
    this.attachment.emitter.subscribe((response : any) => {
      if(response.progress <= 99)
        this.progress = response.progress;
      this.meta.attachment_guid = response.guid;

      if(response.guid && response.progress == 100)
        this.progress = 100;

      this.cd.markForCheck();
      this.cd.detectChanges();
    });

    if(this.params.get('message')){
      this.meta.message = this.params.get('message');
      this.cd.markForCheck();
      this.cd.detectChanges();
    }
  }

  openPhoto(){
    this.attachment.takePicture();
  }

  openVideo(){
    this.attachment.takeVideo();
  }

  openLibrary(){
    this.attachment.selectFromLibrary();
  }

  post(){
    let loader = this.loadingCtrl.create({
      //content: "Please wait...",
    });
    loader.present();

    this.client.post('api/v1/newsfeed', this.meta)
      .then((response : any) => {
        // if(this.meta.attachment_guid){
        //   this.wallet.increment(10);
        // } else {
        //   this.wallet.increment(1);
        // }

        this.meta = {
          message: '',
          attachment_guid: '',
          mature: 0,
        };
        this.progress = 0;

        //this.modalCtrl.create(BoostComponent, { entity: response.activity })
         // .present();
         let fab = this.boostFab.create({ entity: response.activity });
         fab.present();

        this.toastCtrl.create({
            message: 'Posted!',
            duration: 3000,
            position: 'bottom'
          })
          .present();

        //trigger a toaster message
        this.dismiss();
        loader.dismiss();
      })
      .catch((err) => {
        loader.dismiss();
        this.toastCtrl.create({
            message: 'Ooops! There was an error positing.',
            duration: 3000,
            position: 'bottom'
          })
          .present();
      })
  }

  setRichMeta(meta){
    this.meta = Object.assign(this.meta, meta);
  }

  toggleMature() {
    this.meta.mature = !this.meta.mature ? 1 : 0;
    this.cd.markForCheck();
    this.cd.detectChanges();
  }

  dismiss(){
    this.attachment.reset();
    this.viewCtrl.dismiss();
  }

}
