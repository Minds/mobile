import { NgModule }     from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { CommonModule } from '../../common/common.module';
import { Client } from '../../common/services/api/client';
import { ButtonsModule } from '../buttons/buttons.module';

import { CommentsList } from './list.component';

@NgModule({
  imports: [ IonicModule, CommonModule, ButtonsModule ],
  providers: [ Client ],
  declarations: [ CommentsList ],
  exports: [ CommentsList ],
  entryComponents: [ CommentsList ]
})
export class CommentsModule { }
