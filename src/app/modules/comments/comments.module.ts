import { NgModule }     from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { CommonModule } from '../../common/common.module';
import { Client } from '../../common/services/api/client';

import { CommentsList } from './list.component';

@NgModule({
  imports: [ IonicModule, CommonModule ],
  providers: [ Client ],
  declarations: [ CommentsList ],
  exports: [ CommentsList ],
  entryComponents: [ CommentsList ]
})
export class CommentsModule { }
