import { Injectable } from '@angular/core';
import { ModalController } from 'ionic-angular';

import { StripeCheckout } from '../payments/stripe/checkout.component';
import { Client } from '../../common/services/api/client';

@Injectable()
export class WireService {

  guid : string;
  method : string;
  amount : number;
  recurring : boolean;
  payload: any;

  constructor(private client : Client, private modalCtrl : ModalController){

  }

  send(){

    return new Promise((resolve, reject) => {
      if (!this.payload) {
        resolve(this.getTransactionPayloads());
        return;
      }

      resolve(this.payload);
    })
      .then((payload) => {
        return this.client.post(`api/v1/wire/${this.guid}`, {
          payload,
          method: this.method,
          amount: this.amount,
          recurring: this.recurring
        })
      })
      .then(() => {
        return true;
      })
      .catch((e) => {
        throw e;
      });
  }

  getTransactionPayloads(): Promise<any> {
    switch(this.method){
      case "money":
        return new Promise((resolve, reject) => {
          let checkout = this.modalCtrl.create(StripeCheckout, {
            success: (nonce : string) => {
              resolve({nonce: nonce});
            },
            error: (msg) => {
              reject({ message: msg });
            }
          });

          checkout.present();
        });

      case "bitcoin":
        return Promise.reject({ message: 'Not implemented' });

      case "points":
        return Promise.resolve({})
    }

    return Promise.reject({ message: 'Unknown method' });
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

  setRecurring(recurring: boolean) {
    this.recurring = recurring;
  }

  setPayload(payload: any) {
    this.payload = payload;
  }

}
