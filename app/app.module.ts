import { NativeScriptModule } from "nativescript-angular/platform";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { NativeScriptHttpModule } from 'nativescript-angular/http';
import { NgModule } from "@angular/core";
import { MindsNativeApp } from "./app.component";

import { ApiModule } from './src/common/services/api.module';
import { AuthModule } from './src/modules/auth/auth.module';
import { TabsModule } from './src/modules/tabs/tabs.module';
import { ChannelModule } from './src/modules/channel/channel.module';

import { routes } from "./app.routes";


@NgModule({
  declarations: [ MindsNativeApp ],
  bootstrap: [ MindsNativeApp ],
  imports: [
    NativeScriptModule,
    NativeScriptHttpModule,
    ApiModule,
    AuthModule,
    TabsModule,
    ChannelModule,
    NativeScriptRouterModule,
    NativeScriptRouterModule.forRoot(routes)
  ]
})
export class MindsNativeModule {}
