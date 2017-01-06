import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from 'ionic-angular';

import { TabsComponent } from './tabs.component';
import { ChannelModule } from '../channel/channel.module';
import { NewsfeedModule } from '../newsfeed/newsfeed.module';
import { NotificationsModule } from '../notifications/notifications.module';


@NgModule({
  imports: [
    IonicModule,
    ChannelModule,
    NewsfeedModule,
    NotificationsModule
  ],
  declarations: [ TabsComponent ],
  exports: [ TabsComponent ],
  entryComponents: [ TabsComponent ]
})
export class TabsModule { }
