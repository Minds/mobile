import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule, App, Platform } from 'ionic-angular';

import { Client } from '../../common/services/api/client';
import { PushService } from './push.service';
import { NotificationRouterService } from "../notifications/notification-router.service";
import { AppStatusService } from "../../common/services/app-status.service";

@NgModule({
  imports: [ IonicModule ],
  providers: [
    {
      provide: PushService,
      useFactory: PushService._,
      deps: [ Client, Platform, NotificationRouterService, AppStatusService ]
    },
  ]
})
export class PushModule { }
