import { Component, OnInit, OnDestroy, Input, ChangeDetectionStrategy, ChangeDetectorRef, HostListener } from '@angular/core';
import { NavParams, AlertController, ViewController, LoadingController } from 'ionic-angular'
import { Client } from '../../../common/services/api/client';
import { CacheService } from '../../../common/services/cache/cache.service';
import { Storage } from '../../../common/services/storage';

import { loadScript } from '../scriptloader.service.ts';

import { CONFIG } from '../../../config';

@Component({
  moduleId: 'module.id',
  selector: 'stripe-checkout',
  templateUrl: 'checkout.component.html',
  //changeDetection: ChangeDetectionStrategy.OnPush
})

export class StripeCheckout {

  minds = {
    cdn_url: CONFIG.cdnUrl
  }

  stripe;
  token : string;
  nonce : string;

  constructor(public client : Client, public params: NavParams,
    private viewCtrl : ViewController, private loadingCtrl : LoadingController, private alertCtrl : AlertController){
    loadScript('https://js.stripe.com/v2', 'Stripe')
      .then(Stripe => {
        this.stripe = Stripe;
        console.log(this.stripe);
      });

    this.client.get('api/v1/payments/stripe/token/default')
     .then((response : any) => { this.token = response.token });
  }

  setupClient(){

  }

  ngOnInit(){

    (<any>window).CardIO.scan({
        "requireExpiry": true,
        "requireCVV": true,
        "requirePostalCode": false,
        "restrictPostalCodeToNumericOnly": true
      },
      (response) => {
        //ask stripe for a nonce
        this.setCard(response);
      },
      () => {
        console.log('card details failed to save');
        if(this.params.get('error'))
          this.params.get('error')('');
        this.viewCtrl.dismiss();
        //cancelled
      }
    );

  }

  setCard(card){

    let loader = this.loadingCtrl.create();
    loader.present();

    this.stripe.setPublishableKey(this.token);

    this.stripe.card.createToken({
        number: card.cardNumber,
        cvc: card.cvv,
        exp_month: card.expiryMonth,
        exp_year: card.expiryYear
      }, (status, response) => {

        loader.dismiss();

        if(response.error){
          if(this.params.get('error'))
            this.params.get('error')(response.err);
          this.viewCtrl.dismiss();
          return false;
        }

        let nonce = response.id;
        this.nonce = nonce;

        if(this.params.get('success'))
          this.params.get('success')(nonce);

        this.viewCtrl.dismiss();
      });
  }

}
