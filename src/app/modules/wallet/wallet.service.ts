import { Client } from '../../common/services/api/client';
import { EventEmitter, Injectable } from '@angular/core';
import { App } from 'ionic-angular'

import { PopController } from './pop/pop';

export class WalletService{

  emitter : EventEmitter<any> = new EventEmitter();
  points : number;

  constructor(private client : Client, private popCtrl : PopController){
    //this.getCount();
  }

  getCount(refresh : boolean = false){

    if(refresh || !this.points){
      this.getCountFromApi()
        .then((count : number) => {
          this.points = count;
          this.emitter.next(count);
        });
    }

    //prevent a race condition, don't emit before we subscribe.
    setTimeout(() => {
      this.emitter.next(this.points);
    }, 100);

    return this.emitter;
  }

  getCountFromApi(){
    return new Promise((resolve, reject) => {
      this.client.get('api/v1/wallet/count')
        .then((response : any) => {
          resolve(response.count);
        });
    });
  }

  playAnimation(points : number){
    this.popCtrl.create({text: '+' + points}).present();
  }

  increment(points : number){
    this.playAnimation(points);
    this.points += points;
    this.emitter.next(this.points);
  }

  decrement(points : number){
    this.points -= points;
    this.emitter.next(this.points);
  }

  static _(client : Client, popCtrl : PopController){
    return new WalletService(client, popCtrl);
  }

}
