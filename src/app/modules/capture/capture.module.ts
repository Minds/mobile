import { NgModule }     from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { CommonModule } from '../../common/common.module';
import { Client } from '../../common/services/api/client';

import { CaptureComponent } from './capture.component';

@NgModule({
  imports: [ IonicModule, CommonModule ],
  providers: [ Client ],
  declarations: [ CaptureComponent ],
  exports: [ CaptureComponent ],
  entryComponents: [ CaptureComponent ]
})
export class CaptureModule { }
