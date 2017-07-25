import { NgModule } from '@angular/core';

import { PaywallComponent } from './paywall/paywall.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';

@NgModule({
  imports: [ IonicModule, CommonModule ],
  exports: [ PaywallComponent ],
  declarations: [ PaywallComponent ],
  providers: [],
})
export class PaywallModule {
}
