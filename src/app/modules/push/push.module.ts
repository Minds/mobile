import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule, App, Platform } from 'ionic-angular';

import { Client } from '../../common/services/api/client';
import { PushService } from './push.service';

@NgModule({
  imports: [ IonicModule ],
  providers: [
    {
      provide: PushService,
      useFactory: PushService._,
      deps: [ Client, Platform ]
    },
  ]
})
export class PushModule { }
