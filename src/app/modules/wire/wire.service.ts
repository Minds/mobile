import { Injectable } from '@angular/core';
import { ModalController } from 'ionic-angular';

import { StripeCheckout } from '../payments/stripe/checkout.component';
import { Client } from '../../common/services/api/client';

@Injectable()
export class WireService {

  guid : string;
  method : string;
  amount : number;

  constructor(private client : Client, private modalCtrl : ModalController){

  }

  send(){
    return this.getTransactionPayloads()
      .then((payload) => {
        return this.client.post(`api/v1/wire/${this.guid}`, {
            payload,
            method: this.method,
            amount: this.amount
          })
          .then(() => {
            return true;
          })
          .catch((e) => {
            return e;
          })
      });
  }

  getTransactionPayloads(){
    return new Promise((resolve, reject) => {
      switch(this.method){
        case "money":
          let checkout = this.modalCtrl.create(StripeCheckout, {
              success: (nonce : string) => {
                resolve({nonce: nonce});
              },
              error: (msg) => {
                reject(msg);
              }
            });
          checkout.present();
          break;
        case "bitcoin":
          break;
        case "points":
          resolve({});
          break;
      }
    });
  }

  setMethod(method : string){
    this.method = method;
    return this;
  }

  setAmount(amount : number){
    this.amount = amount;
    return this;
  }

  setEntityGuid(guid : string){
    this.guid = guid;
  }

}
