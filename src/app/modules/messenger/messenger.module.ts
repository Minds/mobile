import { NgModule }     from '@angular/core';
import { IonicModule } from 'ionic-angular';


import { Client } from '../../common/services/api/client';

import { MessengerList } from './list.component';
import { MessengerView } from './view.component';

@NgModule({
  imports: [ IonicModule ],
  providers: [ Client ],
  declarations: [ MessengerList, MessengerView ],
  exports: [ MessengerList ],
  entryComponents: [ MessengerList, MessengerView ]
})
export class MessengerModule { }
