import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';
import { NativeScriptModule } from "nativescript-angular/platform";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { TabsComponent } from './tabs.component';
import { NewsfeedModule } from '../newsfeed/newsfeed.module';
import { NotificationsModule } from '../notifications/notifications.module';


@NgModule({
  imports: [
    NativeScriptModule,
    NativeScriptRouterModule,
    NewsfeedModule,
    NotificationsModule
  ],
  declarations: [ TabsComponent ],
  exports: [ TabsComponent ]
})
export class TabsModule { }
