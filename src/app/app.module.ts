import { NgModule, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { MindsApp } from './app.component';
import { ApiModule } from './common/services/api.module';
import { CacheModule } from './common/services/cache/cache.module';

import { CommonModule } from './common/common.module';

import { AuthModule } from './modules/auth/auth.module';
import { BlogModule } from './modules/blog/blog.module';
import { TabsModule } from './modules/tabs/tabs.module';
import { ChannelModule } from './modules/channel/channel.module';
import { CommentsModule } from './modules/comments/comments.module';
import { GroupsModule } from './modules/groups/groups.module';
import { NewsfeedModule } from './modules/newsfeed/newsfeed.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { OnboardingModule } from './modules/onboarding/onboarding.module';

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
          swipeBackEnabled: true,
          tabsPlacement: 'bottom'
        },
        ios: {
          statusbarPadding: true
        }
      }
    }),
    CommonModule,
    ApiModule,
    BlogModule,
    CacheModule,
    AuthModule,
    TabsModule,
    ChannelModule,
    CommentsModule,
    GroupsModule,
    NewsfeedModule,
    NotificationsModule,
    OnboardingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [IonicApp],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class MindsAppModule {}
