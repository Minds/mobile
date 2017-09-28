import { Injectable } from '@angular/core';

import { Client } from '../../common/services/api/client';
import { PaymentsService } from "../../common/services/payments.service";

@Injectable()
export class WireService {

  guid : string;
  method : string;
  amount : number;
  recurring : boolean;
  payload: any;

  constructor(private client : Client, private payments: PaymentsService){

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
    switch (this.method) {
      case "money":

        return this.payments.checkout(this.amount, 'USD', 'Wire')
          .then(nonce => {
            return { nonce };
          });

      case "bitcoin":
        return Promise.reject({ message: 'Not implemented' });

      case "points":
        return Promise.resolve({});
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

  areSubscriptionsAllowed() {
    return this.payments.areSubscriptionsAllowed();
  }

  showCardUI() {
    return this.payments.showCardUI();
  }

}
