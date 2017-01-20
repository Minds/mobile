import { NgModule }     from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { DiscoveryList } from './list.component';
import { Client } from '../../common/services/api/client';
import { CommonModule } from '../../common/common.module';
import { HeaderModule } from '../header/header.module';

@NgModule({
  imports: [ IonicModule, CommonModule, HeaderModule ],
  providers: [ Client ],
  declarations: [ DiscoveryList ],
  exports: [ DiscoveryList ],
  entryComponents: [ DiscoveryList ]
})
export class DiscoveryModule { }
