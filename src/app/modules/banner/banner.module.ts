import { NgModule }     from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { Client } from '../../common/services/api/client';
import { BannerComponent } from './banner.component';

@NgModule({
  imports: [ IonicModule ],
  providers: [ Client ],
  declarations: [ BannerComponent ],
  exports: [ BannerComponent ]
})
export class BannerModule { }
