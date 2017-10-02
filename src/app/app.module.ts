import { NgModule, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { MindsApp } from './app.component';
import { ApiModule } from './common/services/api.module';
import { CacheModule } from './common/services/cache/cache.module';

import { CommonModule } from './common/common.module';

import { AuthModule } from './modules/auth/auth.module';
import { BlogModule } from './modules/blog/blog.module';
import { BoostModule } from './modules/boost/boost.module';
import { TabsModule } from './modules/tabs/tabs.module';
import { ChannelModule } from './modules/channel/channel.module';
import { CommentsModule } from './modules/comments/comments.module';
import { GroupsModule } from './modules/groups/groups.module';
import { NewsfeedModule } from './modules/newsfeed/newsfeed.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { OnboardingModule } from './modules/onboarding/onboarding.module';
import { PushModule } from './modules/push/push.module';
import { ShareModule } from './modules/share/share.module';
import { SettingsModule } from './modules/settings/settings.module';
import { RemindModule } from "./modules/remind/remind.module";
import { VideoModule } from "./modules/video/video.module";
import { SuggestionsModule } from './modules/suggestions/suggestions.module';

import { routes } from "./app.routes";

@NgModule({
  declarations: [
    MindsApp
  ],
  imports: [
    IonicModule.forRoot(MindsApp, {
      tabsHideOnSubPages: false, //Shows bottom tab on subpages. Set it to false because it improves UX. 
      tabsPlacement: 'bottom',
      platforms: {
        android: {
          swipeBackEnabled: true,
          tabsPlacement: 'bottom'
        },
        ios: {
          swipeBackEnabled: true,
          statusbarPadding: true
        }
      }
    }),
    SuggestionsModule,
    CommonModule,
    ApiModule,
    BlogModule,
    BoostModule,
    CacheModule,
    AuthModule,
    TabsModule,
    ChannelModule,
    CommentsModule,
    GroupsModule,
    NewsfeedModule,
    NotificationsModule,
    OnboardingModule,
    PushModule,
    ShareModule,
    SettingsModule,
    RemindModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [IonicApp],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class MindsAppModule {}
