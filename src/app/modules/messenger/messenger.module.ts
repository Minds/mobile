import { NgModule }     from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { CommonModule } from '../../common/common.module';
import { Client } from '../../common/services/api/client';

import { MessengerList } from './list.component';
import { MessengerView } from './view.component';

@NgModule({
  imports: [ IonicModule, CommonModule ],
  providers: [ Client ],
  declarations: [ MessengerList, MessengerView ],
  exports: [ MessengerList ],
  entryComponents: [ MessengerList, MessengerView ]
})
export class MessengerModule { }
