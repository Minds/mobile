import { Injectable } from '@angular/core';

import { Client } from '../../common/services/api/client';

@Injectable()
export class WireService {

  guid : string;
  method : string;
  amount : number;

  constructor(private client : Client){

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
            throw e;
          })
      });
  }

  getTransactionPayloads(){
    return new Promise((resolve, reject) => {
      switch(this.method){
        case "money":
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
