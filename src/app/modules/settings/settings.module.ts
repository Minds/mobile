import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { CommonModule } from '../../common/common.module';
import { SettingsComponent } from './settings.component';
import { SettingsBillingSavedCardsComponent } from './billing/saved-cards/saved-cards.component';
import { SettingsBillingSubscriptionsComponent } from './billing/subscriptions/subscriptions.component';
import { PaymentsModule } from '../payments/payments.module';

@NgModule({
  imports: [ IonicModule, CommonModule, PaymentsModule ],
  declarations: [
    SettingsComponent,
    SettingsBillingSavedCardsComponent,
    SettingsBillingSubscriptionsComponent
  ],
  exports: [ SettingsComponent ],
  entryComponents: [ SettingsComponent ]
})
export class SettingsModule {
}
