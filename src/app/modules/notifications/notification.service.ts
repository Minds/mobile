import { Client } from '../../common/services/api/client';
import { EventEmitter } from '@angular/core';

export class NotificationService{

  emitter : EventEmitter<any> = new EventEmitter();
  initialized : boolean = false;
  unread : number;

  constructor(private client : Client){

  }

  getCount(refresh : boolean = false){

    if(refresh || !this.initialized){
      this.getCountFromApi()
        .then((count : number) => {
          this.unread = count;
          this.emitter.next(this.unread);
        });
    }

    //prevent a race condition, don't emit before we subscribe.
    setTimeout(() => {
      this.emitter.next(this.unread);
    }, 100);

    return this.emitter;
  }

  getCountFromApi(){
    return new Promise((resolve, reject) => {
      this.client.get('api/v1/notifications/count')
        .then((response : any) => {
          resolve(response.count);
        });
    });
  }

  clear(){
    this.unread = 0;
    this.emitter.next(this.unread);
  }

  static _(client : Client){
    return new NotificationService(client);
  }

}
