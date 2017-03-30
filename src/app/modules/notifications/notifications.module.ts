import { NgModule }     from '@angular/core';
import { IonicModule, App } from 'ionic-angular';

import { CommonModule } from '../../common/common.module';
import { HeaderModule } from '../header/header.module';
import { Client } from '../../common/services/api/client';
import { NotificationsList } from './list.component';
import { NotificationCard } from './card/card.component';
import { NotificationService } from './notification.service';
import { NotificationRouterService } from "./notification-router.service";
import { NotificationsCounterComponent } from './counter.component';
import { NotificationSettingsComponent } from './settings.component';

@NgModule({
  imports: [ IonicModule, CommonModule ],
  providers: [
    {
      provide: NotificationService,
      useFactory: NotificationService._,
      deps: [ Client ]
    },
    {
      provide: NotificationRouterService,
      useFactory: NotificationRouterService._,
      deps: [ App ]
    },
  ],
  declarations: [ NotificationsList, NotificationCard, NotificationsCounterComponent, NotificationSettingsComponent ],
  exports: [ NotificationsList, NotificationCard, NotificationsCounterComponent, NotificationSettingsComponent ],
  entryComponents: [ NotificationsList, NotificationSettingsComponent ]
})
export class NotificationsModule { }
