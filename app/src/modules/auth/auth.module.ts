import { NgModule }     from '@angular/core';
import { HttpModule, JsonpModule } from '@angular/http';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { NativeScriptModule } from "nativescript-angular/platform";

import { OAuth2 } from '../../common/services/api/oauth2';
import { LoginComponent } from './login.component';

@NgModule({
  imports: [ NativeScriptModule, NativeScriptRouterModule, HttpModule ],
  providers: [ OAuth2 ],
  declarations: [ LoginComponent ],
  exports: [ LoginComponent ]
})
export class AuthModule { }
