import { NgModule, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
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

import { Camera } from '@ionic-native/camera';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';
import { AppVersion } from '@ionic-native/app-version';
import { MediaCapture } from '@ionic-native/media-capture';
import { Transfer } from '@ionic-native/transfer';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { SQLite } from '@ionic-native/sqlite';
import { SocialSharing } from '@ionic-native/social-sharing';
import { CurrentUserService } from "./common/services/current-user.service";
import { PaymentsService } from "./common/services/payments.service";

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
          swipeBackEnabled: true,
          statusbarPadding: true
        }
      }
    }),
    BrowserModule,
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
  providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }, StatusBar, SplashScreen, Keyboard, Camera, AppVersion, MediaCapture, Transfer, PhotoViewer, SQLite, SocialSharing, CurrentUserService, PaymentsService ]
})
export class AppModule { }
