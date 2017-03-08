import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule, App } from 'ionic-angular';

import { CommonModule } from '../../common/common.module';
import { NewsfeedModule } from '../newsfeed/newsfeed.module';
import { WireFabController } from './fab';
import { WireFabComponent } from './fab.component';

@NgModule({
  imports: [ IonicModule, CommonModule ],
  declarations: [ WireFabComponent ],
  providers: [
    WireFabController
  ],
  exports: [ WireFabComponent ],
  entryComponents: [ WireFabComponent ]
})
export class WireModule { }
