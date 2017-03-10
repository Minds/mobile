import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule, App } from 'ionic-angular';

import { CommonModule } from '../../common/common.module';
import { PaymentsModule } from '../payments/payments.module';
import { WireFabController } from './fab';
import { WireFabComponent } from './fab.component';
import { WireService } from './wire.service';

@NgModule({
  imports: [ IonicModule, CommonModule, PaymentsModule ],
  declarations: [ WireFabComponent ],
  providers: [
    WireFabController,
    WireService
  ],
  exports: [ WireFabComponent ],
  entryComponents: [ WireFabComponent ]
})
export class WireModule { }
