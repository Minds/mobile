import { Component, OnInit, OnDestroy, Input, ChangeDetectionStrategy, ChangeDetectorRef, HostListener } from '@angular/core';
import { NavParams, AlertController, ViewController, LoadingController } from 'ionic-angular'
import { Client } from '../../../common/services/api/client';
import { CacheService } from '../../../common/services/cache/cache.service';
import { Storage } from '../../../common/services/storage';

import { loadScript } from '../scriptloader.service.ts';

@Component({
  moduleId: 'module.id',
  selector: 'braintree-checkout',
  templateUrl: 'checkout.component.html',
  //changeDetection: ChangeDetectionStrategy.OnPush
})

export class BraintreeCheckout {

  minds = {
    cdn_url: 'https://edge.minds.com/'
  }

  braintree;
  token : string;
  nonce : string;

  constructor(public client : Client, public params: NavParams,
    private viewCtrl : ViewController, private loadingCtrl : LoadingController, private alertCtrl : AlertController){
    loadScript('https://js.braintreegateway.com/web/3.7.0/js/client.min.js', 'braintree')
      .then(Braintree => {
        this.braintree = Braintree;
        console.log(this.braintree);
      });

    this.client.get('api/v1/payments/braintree/token/default')
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
        //show loading controller

        //ask braintree for a nonce
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

    this.braintree.client.create({
        authorization: this.token
      }, (err, client) => {
        client.request({
          endpoint: 'payment_methods/credit_cards',
          method: 'post',
          data: {
            creditCard: {
              number: card.cardNumber,
              expirationDate: card.expiryMonth + '/' + card.expiryYear,
              cvv: card.cvv
            }
          }
        }, (err, response) => {

          loader.dismiss();

          if(err){
            console.log(err);
            if(this.params.get('error'))
              this.params.get('error')(err);
            this.viewCtrl.dismiss();
            return false;
          }

          let nonce = response.creditCards[0].nonce;
          this.nonce = nonce;

          if(this.params.get('success'))
            this.params.get('success')(nonce);

          this.viewCtrl.dismiss();

      });
    });

  }

}
