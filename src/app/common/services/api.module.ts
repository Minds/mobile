import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

export { OAuth2 } from './api/oauth2';

@NgModule({
  imports: [ HttpModule ]
})
export class ApiModule { }
