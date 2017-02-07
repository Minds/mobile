import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { Storage } from './storage';
import { OAuth2 } from './api/oauth2';

export { OAuth2 } from './api/oauth2';

@NgModule({
  imports: [ HttpModule ],
  providers: [ OAuth2, Storage ]
})
export class ApiModule { }
