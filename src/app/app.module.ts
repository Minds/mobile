import { NgModule, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { MindsApp } from './app.component';
import { ApiModule } from './common/services/api.module';
import { CacheModule } from './common/services/cache/cache.module';

import { CommonModule } from './common/common.module';

import { AuthModule } from './modules/auth/auth.module';
import { TabsModule } from './modules/tabs/tabs.module';
import { ChannelModule } from './modules/channel/channel.module';
import { CommentsModule } from './modules/comments/comments.module';
import { NewsfeedModule } from './modules/newsfeed/newsfeed.module';
import { NotificationsModule } from './modules/notifications/notifications.module';


import { routes } from "./app.routes";

@NgModule({
  declarations: [
    MindsApp
  ],
  imports: [
    IonicModule.forRoot(MindsApp, {
      tabsHideOnSubPages: true,
      tabsPlacement: 'bottom',
      platforms: {
        android: {
          tabsPlacement: 'bottom'
        }
      }
    }),
    CommonModule,
    ApiModule,
    CacheModule,
    AuthModule,
    TabsModule,
    ChannelModule,
    CommentsModule,
    NewsfeedModule,
    NotificationsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [IonicApp],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class MindsAppModule {}
