import { Component, OnInit, OnDestroy, Input, ChangeDetectionStrategy, ChangeDetectorRef, HostListener } from '@angular/core';
import { ModalController, AlertController, NavController, LoadingController } from 'ionic-angular'
import { Client } from '../../common/services/api/client';
import { CacheService } from '../../common/services/cache/cache.service';
import { Storage } from '../../common/services/storage';

import { WalletService } from './wallet.service';
import { BraintreeCheckout } from '../payments/braintree/checkout.component';

import { CONFIG } from '../../config';

@Component({
  moduleId: 'module.id',
  selector: 'purchase-points',
  templateUrl: 'purchase.component.html',
  //changeDetection: ChangeDetectionStrategy.OnPush
})

export class PurchaseComponent {

  minds = {
    cdn_url: CONFIG.cdnUrl
  }

  ex : number = 0.01;
  points : number = 10000;
  usd : number;

  subscription;

  nonce : string | number = "";
  recurring : boolean = true;

  constructor(public client : Client, public service : WalletService,  public modalCtrl: ModalController,
    private navCtrl : NavController, private loadingCtrl : LoadingController, private alertCtrl : AlertController){
    this.getRate();
    this.calculateUSD();
    this.getSubscription();
  }

  validate(){
    if(this.usd < 0.01)
      return false;

    return true;
  }

  getRate(){
    this.client.get('api/v1/wallet/count')
      .then((response : any) => {
        this.ex = response.ex.usd;
      });
  }

  calculatePoints(){
    this.points = this.usd / this.ex;
  }

  calculateUSD(){
    this.usd = this.points * this.ex;
    this.client.post('api/v1/wallet/quote', { points: this.points })
      .then((response : any) => {
        this.usd = response.usd;
      });
  }

  buy(){
    let checkout = this.modalCtrl.create(BraintreeCheckout, {
        success: (nonce : string) => {
          this.nonce = nonce;
          this.purchase();
        },
        error: (msg) => {
          let alert = this.alertCtrl.create({
            title: 'Ooooopppsss...',
            subTitle: "We couldn't process your card details",
            buttons: ['Try again']
          });
          alert.present();
        }
      });
    checkout.present();
  }

  getSubscription(){
    this.client.get('api/v1/wallet/subscription')
      .then((response : any) => {
        if(response.subscription){
          this.subscription = response.subscription;
        }
      });
  }

  cancelSubscription(){
    if(!confirm("Are you sure you wish to cancel your monthly points subscription?"))
      return false;
    this.client.delete('api/v1/wallet/subscription')
      .then((response : any) => {
        this.subscription = null;
      });
  }

  purchase(){
    if(!this.validate()){
      let alert = this.alertCtrl.create({
        title: 'Ooooopppsss...',
        subTitle: "Please check your details",
        buttons: ['Try again']
      });
      alert.present();
      return false;
    }

    let loader = this.loadingCtrl.create();
    loader.present();

    if(this.recurring){
      this.client.post('api/v1/wallet/subscription', {
          points: this.points,
          nonce: this.nonce
        })
        .then((response : any) => {
          loader.dismiss();
          if(response.status != 'success'){
            let alert = this.alertCtrl.create({
              title: 'Ooooopppsss...',
              subTitle: "Please check your details",
              buttons: ['Try again']
            });
            alert.present();
            this.nonce = null;
            return false;
          }
          this.navCtrl.pop();
          this.service.increment(this.points*1.1);
        })
        .catch((e) => {
          loader.dismiss();
          let alert = this.alertCtrl.create({
            title: 'Ooooopppsss...',
            subTitle: e.message,
            buttons: ['Try again']
          });
          alert.present();
          this.nonce = null;
        });
    } else {
       this.client.post('api/v1/wallet/purchase-once', {
         amount: this.usd,
         points: this.points,
         nonce: this.nonce
       })
       .then((response : any) => {
         loader.dismiss();
         if(response.status != 'success'){
           let alert = this.alertCtrl.create({
             title: 'Ooooopppsss...',
             subTitle: "Please check your details",
             buttons: ['Try again']
           });
           alert.present();
           return false;
         }
         this.navCtrl.pop();
         this.service.increment(this.points);
       })
       .catch((e) => {
         loader.dismiss();
         let alert = this.alertCtrl.create({
           title: 'Ooooopppsss...',
           subTitle: e.message,
           buttons: ['Try again']
         });
         alert.present();
         this.nonce = null;
       });
    }
  }

  setNonce(nonce : string){
    this.nonce = nonce;
    this.purchase();
  }

}
