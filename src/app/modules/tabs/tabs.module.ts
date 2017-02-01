import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from 'ionic-angular';

import { TabsComponent } from './tabs.component';
import { CaptureModule } from '../capture/capture.module';
import { ChannelModule } from '../channel/channel.module';
import { DiscoveryModule } from '../discovery/discovery.module';
import { MessengerModule } from '../messenger/messenger.module';
import { NewsfeedModule } from '../newsfeed/newsfeed.module';
import { NotificationsModule } from '../notifications/notifications.module';


@NgModule({
  imports: [
    IonicModule,
    CaptureModule,
    ChannelModule,
    DiscoveryModule,
    MessengerModule,
    NewsfeedModule,
    NotificationsModule
  ],
  declarations: [ TabsComponent ],
  exports: [ TabsComponent ],
  entryComponents: [ TabsComponent ]
})
export class TabsModule { }
