import { NgModule }     from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { DiscoveryList } from './list.component';
import { DiscoveryOptionsComponent } from './options.component';
import { DiscoveryService } from './discovery.service';
import { DiscoveryEntity } from './entity/entity.component';
import { DiscoveryView } from './view.component';
import { Client } from '../../common/services/api/client';
import { Storage } from '../../common/services/storage';
import { ButtonsModule } from '../buttons/buttons.module';
import { CommonModule } from '../../common/common.module';
import { HeaderModule } from '../header/header.module';
import { VideoModule } from "../video/video.module";

@NgModule({
  imports: [ IonicModule, CommonModule, ButtonsModule, HeaderModule, VideoModule ],
  providers: [
    {
      provide: DiscoveryService,
      useFactory: DiscoveryService._,
      deps: [ Client, Storage ]
    }
  ],
  declarations: [ DiscoveryList, DiscoveryOptionsComponent, DiscoveryView, DiscoveryEntity ],
  exports: [ DiscoveryList, DiscoveryOptionsComponent, DiscoveryView, DiscoveryEntity ],
  entryComponents: [ DiscoveryList, DiscoveryOptionsComponent, DiscoveryView ]
})
export class DiscoveryModule { }
