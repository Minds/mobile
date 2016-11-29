import { NgModule }     from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { NativeScriptModule } from "nativescript-angular/platform";

import { Client } from '../../common/services/api/client';
import { NotificationsList } from './list.component';
import { NotificationCard } from './card/card.component';


@NgModule({
  imports: [ NativeScriptModule, NativeScriptRouterModule ],
  providers: [ Client ],
  declarations: [ NotificationsList, NotificationCard ],
  exports: [ NotificationsList, NotificationCard ]
})
export class NotificationsModule { }
