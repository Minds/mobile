import { NgModule }     from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { CommonModule } from '../../common/common.module';
import { HeaderModule } from '../header/header.module';
import { Client } from '../../common/services/api/client';

import { MessengerList } from './list.component';
import { MessengerView } from './view.component';
import { MessengerSetup } from './setup.component';
import { DecryptionComponent } from './decryption.component';
import { DecryptionPipe } from './decryption.pipe';

@NgModule({
  imports: [ IonicModule, CommonModule, HeaderModule ],
  providers: [ Client ],
  declarations: [ MessengerList, MessengerView, MessengerSetup, DecryptionComponent, DecryptionPipe ],
  exports: [ MessengerList ],
  entryComponents: [ MessengerList, MessengerView, MessengerSetup ]
})
export class MessengerModule { }
