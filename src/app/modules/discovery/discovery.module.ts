import { NgModule }     from '@angular/core';
import { IonicModule } from 'ionic-angular';


import { Client } from '../../common/services/api/client';


@NgModule({
  imports: [ IonicModule ],
  providers: [ Client ],
  declarations: [ ],
  exports: [],
  entryComponents: [ ]
})
export class DiscoveryModule { }
