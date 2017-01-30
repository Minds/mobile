import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from 'ionic-angular';

import { WalletCounterComponent } from './counter.component';
import { CommonModule } from '../../common/common.module';
import { WalletComponent } from './wallet.component';
import { WalletService } from './wallet.service';
import { Client } from '../../common/services/api/client';

@NgModule({
  imports: [ IonicModule, CommonModule ],
  declarations: [ WalletCounterComponent, WalletComponent ],
  providers: [
    {
      provide: WalletService,
      useFactory: WalletService._,
      deps: [ Client ]
    }
  ],
  exports: [ WalletCounterComponent, WalletComponent ],
  entryComponents: [ WalletComponent ]
})
export class WalletModule { }
