import { NgModule, forwardRef } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { CommonModule } from '../../common/common.module';
import { Client } from '../../common/services/api/client';

import { NewsfeedModule } from "../newsfeed/newsfeed.module";
import { RemindComponent } from './remind.component';
import { DiscoveryModule } from "../discovery/discovery.module";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    forwardRef(() => NewsfeedModule),
    forwardRef(() => DiscoveryModule),
  ],
  providers: [ Client ],
  declarations: [ RemindComponent ],
  exports: [ RemindComponent ],
  entryComponents: [ RemindComponent ],
})
export class RemindModule { }
