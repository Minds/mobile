import { NgModule }     from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { DiscoveryList } from './list.component';
import { DiscoveryOptionsComponent } from './options.component';
import { DiscoveryService } from './discovery.service';
import { Client } from '../../common/services/api/client';
import { CommonModule } from '../../common/common.module';
import { HeaderModule } from '../header/header.module';

@NgModule({
  imports: [ IonicModule, CommonModule, HeaderModule ],
  providers: [
    {
      provide: DiscoveryService,
      useFactory: DiscoveryService._,
      deps: [ Client ]
    }
  ],
  declarations: [ DiscoveryList, DiscoveryOptionsComponent ],
  exports: [ DiscoveryList, DiscoveryOptionsComponent ],
  entryComponents: [ DiscoveryList, DiscoveryOptionsComponent ]
})
export class DiscoveryModule { }
