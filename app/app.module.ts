import { NativeScriptModule } from "nativescript-angular/platform";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { NativeScriptHttpModule } from 'nativescript-angular/http';
import { NgModule } from "@angular/core";
import { MindsNativeApp } from "./app.component";

import { ApiModule } from './src/common/services/api.module';
import { CacheModule } from './src/common/services/cache/cache.module';

import { AuthModule } from './src/modules/auth/auth.module';
import { TabsModule } from './src/modules/tabs/tabs.module';
import { ChannelModule } from './src/modules/channel/channel.module';
import { NotificationsModule } from './src/modules/notifications/notifications.module';


import { routes } from "./app.routes";

import { NSFRESCO_DIRECTIVES } from 'nativescript-fresco/angular';
import * as frescoModule from "nativescript-fresco";
import * as applicationModule from "application";

if (applicationModule.android) {
    applicationModule.on("launch", () => {
        frescoModule.initialize();
    });
}

import {registerElement} from "nativescript-angular/element-registry";
registerElement("VideoPlayer", () => require("nativescript-videoplayer").Video);


@NgModule({
  declarations: [ MindsNativeApp, NSFRESCO_DIRECTIVES ],
  bootstrap: [ MindsNativeApp ],
  imports: [
    NativeScriptModule,
    NativeScriptHttpModule,
    ApiModule,
    CacheModule,
    AuthModule,
    TabsModule,
    ChannelModule,
    NotificationsModule,
    NativeScriptRouterModule,
    NativeScriptRouterModule.forRoot(routes)
  ]
})
export class MindsNativeModule {}
