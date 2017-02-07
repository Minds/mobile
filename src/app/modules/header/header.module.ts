import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from 'ionic-angular';

import { HeaderComponent } from './header.component';
import { CommonModule } from '../../common/common.module';
import { WalletModule } from '../wallet/wallet.module';
import { NotificationsModule } from '../notifications/notifications.module';


@NgModule({
  imports: [ IonicModule, CommonModule, WalletModule, NotificationsModule ],
  declarations: [ HeaderComponent ],
  exports: [ HeaderComponent ]
})
export class HeaderModule { }
