import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule, App } from 'ionic-angular';

import { WalletCounterComponent } from './counter.component';
import { PopComponent } from './pop/pop.component';
import { PopController } from './pop/pop';

import { CommonModule } from '../../common/common.module';
import { WalletComponent } from './wallet.component';
import { WalletService } from './wallet.service';
import { PurchaseComponent } from './purchase.component';
import { Client } from '../../common/services/api/client';

@NgModule({
  imports: [ IonicModule, CommonModule ],
  declarations: [ WalletCounterComponent, WalletComponent, PopComponent, PurchaseComponent ],
  providers: [
    {
      provide: WalletService,
      useFactory: WalletService._,
      deps: [ Client, PopController ]
    },
    PopController
  ],
  exports: [ WalletCounterComponent, WalletComponent, PopComponent, PurchaseComponent ],
  entryComponents: [ WalletComponent, PurchaseComponent, PopComponent ]
})
export class WalletModule { }
