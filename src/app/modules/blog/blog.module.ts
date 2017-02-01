import { NgModule }     from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { CommonModule } from '../../common/common.module';
import { Client } from '../../common/services/api/client';

import { BlogView } from './view.component';

@NgModule({
  imports: [ IonicModule, CommonModule ],
  providers: [ Client ],
  declarations: [ BlogView ],
  exports: [ BlogView ],
  entryComponents: [ BlogView ]
})
export class BlogModule { }
