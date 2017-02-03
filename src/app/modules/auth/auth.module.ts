import { NgModule }     from '@angular/core';
import { HttpModule, JsonpModule } from '@angular/http';
import { IonicModule } from 'ionic-angular';

import { OAuth2 } from '../../common/services/api/oauth2';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';

@NgModule({
  imports: [ IonicModule, HttpModule ],
  providers: [ OAuth2 ],
  declarations: [ LoginComponent, RegisterComponent ],
  exports: [ LoginComponent ],
  entryComponents: [ LoginComponent, RegisterComponent ]
})
export class AuthModule { }
