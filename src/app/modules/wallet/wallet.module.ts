import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule, App } from 'ionic-angular';

import { WalletCounterComponent } from './counter.component';
import { PopComponent } from './pop/pop.component';
import { PopController } from './pop/pop';

import { CommonModule } from '../../common/common.module';
import { PaymentsModule } from '../payments/payments.module';
import { BoostModule } from '../boost/boost.module';
import { WalletComponent } from './wallet.component';
import { WalletHistoryComponent } from './history.component';
import { WalletService } from './wallet.service';
import { PurchaseComponent } from './purchase.component';
import { BoostReviewComponent } from './boost.component';
import { Client } from '../../common/services/api/client';
import { SocketsService } from "../../common/services/api/sockets.service";
import { Storage } from "../../common/services/storage";
import { AppStatusService } from "../../common/services/app-status.service";

@NgModule({
  imports: [ IonicModule, CommonModule, PaymentsModule ],
  declarations: [ WalletCounterComponent, WalletComponent, WalletHistoryComponent, PopComponent, PurchaseComponent ],
  providers: [
    {
      provide: WalletService,
      useFactory: WalletService._,
      deps: [ Client, PopController, SocketsService, Storage, AppStatusService ]
    },
    PopController
  ],
  exports: [ WalletCounterComponent, WalletComponent, WalletHistoryComponent, PopComponent, PurchaseComponent ],
  entryComponents: [ WalletComponent, WalletHistoryComponent, PurchaseComponent, PopComponent ]
})
export class WalletModule { }
