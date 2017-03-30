import { Platform } from 'ionic-angular';
import { Client } from '../../common/services/api/client';
import { NotificationRouterService } from "../notifications/notification-router.service";
import { AppStatusService } from "../../common/services/app-status.service";

import { ANDROID_SENDER_ID } from '../../config';

export class PushService {

  push;
  token : string = "";

  constructor(private client : Client, private platform : Platform, private notificationRouter: NotificationRouterService, private appStatus: AppStatusService){
    platform.ready().then(() => {
      this.init();
    });
  }

  init(){
    this.push = (<any>window).PushNotification.init({
      android: {
        senderID: ANDROID_SENDER_ID
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

    this.push.on('error', e => {
      console.error('[Push Service]', e);
    })

    this.listen();
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

  listen() {
    this.push.on('notification', notification => {
      this.appStatus.waitUntilActivates().then(() => this.notificationRouter.route(notification));
    });
  }

  static _(client : Client, platform : Platform, notificationRouter: NotificationRouterService, appStatus: AppStatusService){
    return new PushService(client, platform, notificationRouter, appStatus);
  }
}
