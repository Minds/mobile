import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule, App } from 'ionic-angular';

import { CommonModule } from '../../common/common.module';
import { BraintreeCheckout } from './braintree/checkout.component';
import { StripeCheckout } from './stripe/checkout.component';
import { PlanConsoleComponent } from "./console/plan.component";

import { Client } from '../../common/services/api/client';

@NgModule({
  imports: [ IonicModule, CommonModule ],
  declarations: [ BraintreeCheckout, StripeCheckout, PlanConsoleComponent ],
  exports: [ BraintreeCheckout, StripeCheckout, PlanConsoleComponent ],
  entryComponents: [ BraintreeCheckout, StripeCheckout, PlanConsoleComponent ]
})
export class PaymentsModule { }
