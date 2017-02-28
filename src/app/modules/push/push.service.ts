import { Platform } from 'ionic-angular';
import { Client } from '../../common/services/api/client';

export class PushService {

  push;
  token : string = "";

  constructor(private client : Client, private platform : Platform){
    platform.ready().then(() => {
      this.init();
    });
  }

  init(){
    this.push = (<any>window).PushNotification.init({
      android: {
        senderID: "81109256529"
      },
      ios: {
        alert: "true",
        badge: "true",
        sound: "true"
      },
      windows: {}
    });

    this.push.on('registration', (data) => {
      this.token = data.registrationId;
    });
  }

  registerToken(){
    let service = 'google';
    if(this.platform.is('ios'))
      service = 'apple';
    this.client.post('api/v1/notifications', {
      service: service,
      token: this.token
    });
  }

  static _(client : Client, platform : Platform){
    return new PushService(client, platform);
  }

}
