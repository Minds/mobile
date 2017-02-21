import { NgModule }     from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { DiscoveryList } from './list.component';
import { DiscoveryOptionsComponent } from './options.component';
import { DiscoveryService } from './discovery.service';
import { DiscoveryEntity } from './entity/entity.component';
import { DiscoveryView } from './view.component';
import { Client } from '../../common/services/api/client';
import { ButtonsModule } from '../buttons/buttons.module';
import { CommonModule } from '../../common/common.module';
import { HeaderModule } from '../header/header.module';

@NgModule({
  imports: [ IonicModule, CommonModule, ButtonsModule, HeaderModule ],
  providers: [
    {
      provide: DiscoveryService,
      useFactory: DiscoveryService._,
      deps: [ Client ]
    }
  ],
  declarations: [ DiscoveryList, DiscoveryOptionsComponent, DiscoveryView, DiscoveryEntity ],
  exports: [ DiscoveryList, DiscoveryOptionsComponent, DiscoveryView ],
  entryComponents: [ DiscoveryList, DiscoveryOptionsComponent, DiscoveryView ]
})
export class DiscoveryModule { }
