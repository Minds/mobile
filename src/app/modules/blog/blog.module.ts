import { NgModule }     from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { CommonModule } from '../../common/common.module';
import { Client } from '../../common/services/api/client';

import { BlogView } from './view.component';
import { BlogsList } from './list.component';

@NgModule({
  imports: [ IonicModule, CommonModule ],
  providers: [ Client ],
  declarations: [ BlogView, BlogsList ],
  exports: [ BlogView, BlogsList ],
  entryComponents: [ BlogView, BlogsList ]
})
export class BlogModule { }
