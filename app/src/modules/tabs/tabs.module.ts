import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';
import { NativeScriptModule } from "nativescript-angular/platform";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { TabsComponent } from './tabs.component';
import { ChannelModule } from '../channel/channel.module';
import { NewsfeedModule } from '../newsfeed/newsfeed.module';
import { NotificationsModule } from '../notifications/notifications.module';


@NgModule({
  imports: [
    NativeScriptModule,
    NativeScriptRouterModule,
    ChannelModule,
    NewsfeedModule,
    NotificationsModule
  ],
  declarations: [ TabsComponent ],
  exports: [ TabsComponent ]
})
export class TabsModule { }
