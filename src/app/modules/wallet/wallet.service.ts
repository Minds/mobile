import { Client } from '../../common/services/api/client';
import { EventEmitter } from '@angular/core';

export class WalletService{

  emitter : EventEmitter<any> = new EventEmitter();
  points : number;

  constructor(private client : Client){
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

  increment(points : number){
    this.points += points;
    this.emitter.next(this.points);
  }

  decrement(points : number){
    this.points -= points;
    this.emitter.next(this.points);
  }

  static _(client : Client){
    return new WalletService(client);
  }

}
