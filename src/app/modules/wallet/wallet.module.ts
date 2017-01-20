import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from 'ionic-angular';

import { WalletCounterComponent } from './counter.component';
import { CommonModule } from '../../common/common.module';
import { WalletService } from './wallet.service';
import { Client } from '../../common/services/api/client';

@NgModule({
  imports: [ IonicModule, CommonModule ],
  declarations: [ WalletCounterComponent ],
  providers: [
    {
      provide: WalletService,
      useFactory: WalletService._,
      deps: [ Client ]
    }
  ],
  exports: [ WalletCounterComponent ]
})
export class WalletModule { }
