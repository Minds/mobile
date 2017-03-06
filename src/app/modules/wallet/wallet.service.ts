import { Client } from '../../common/services/api/client';
import { EventEmitter, Injectable } from '@angular/core';
import { App } from 'ionic-angular'

import { PopController } from './pop/pop';
import { SocketsService } from "../../common/services/api/sockets.service";
import { Storage } from '../../common/services/storage';

export class WalletService{

  emitter : EventEmitter<any> = new EventEmitter();
  points: number;

  apiInProgress: boolean = false;
  pointsTxSubscription;

  constructor(private client : Client, private popCtrl : PopController, private sockets: SocketsService, private storage: Storage){
    //this.getCount();
    this.listen();
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

  getCountFromApi() {
    this.apiInProgress = true;
    return this.client.get('api/v1/wallet/count')
      .then((response: { count }) => {
        this.apiInProgress = false;
        return response.count;
      })
      .catch(e => {
        this.apiInProgress = false;
        throw e;
      });
  }

  queueAnimationTimer;
  queueAnimationPoints: number = 0;
  queueAnimation(points: number) {
    if (this.queueAnimationTimer) {
      clearTimeout(this.queueAnimationTimer);
    }

    this.queueAnimationPoints += points;

    this.queueAnimationTimer = setTimeout(() => {
      if (this.queueAnimationPoints > 0) {
        this.playAnimation(this.queueAnimationPoints);
      }

      this.queueAnimationPoints = 0;
    }, 500);
  }

  playAnimation(points : number){
    this.popCtrl.create({text: '+' + points}).present();
  }

  increment(points: number) {
    this.delta(+points);
  }

  decrement(points: number) {
    this.delta(-points);
  }

  delta(points: number) {
    if (points === 0) {
      return;
    }

    if (this.storage.get('pointsAnimation')) {
      this.queueAnimation(points);
    }

    this.points += points;
    this.emitter.next(this.points);
  }

  // real-time
  listen() {
    this.pointsTxSubscription = this.sockets.subscribe('pointsTx', (points, entity_guid, description) => {
      if (this.apiInProgress) {
        return;
      }

      this.delta(points);
    });
  }

  // @todo: when? implement at some global ngOnDestroy()
  unListen() {
    if (this.pointsTxSubscription) {
      this.pointsTxSubscription.unsubscribe();
    }
  }

  // factory
  static _(client : Client, popCtrl : PopController, sockets: SocketsService, storage: Storage){
    return new WalletService(client, popCtrl, sockets, storage);
  }

}
