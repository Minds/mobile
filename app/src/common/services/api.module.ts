import { NgModule } from '@angular/core';
import { NativeScriptHttpModule } from 'nativescript-angular/http';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { NativeScriptModule } from "nativescript-angular/platform";

export { OAuth2 } from './api/oauth2';

@NgModule({
  imports: [ NativeScriptHttpModule ]
})
export class ApiModule { }
