import { NgModule }     from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { CommonModule } from '../../common/common.module';
import { Client } from '../../common/services/api/client';
import { ButtonsModule } from '../buttons/buttons.module';
import { ReportModule } from '../report/report.module';

import { CommentsList } from './list.component';
import { CommentComponent } from './comment.component';

@NgModule({
  imports: [ IonicModule, CommonModule, ButtonsModule, ReportModule ],
  providers: [ Client ],
  declarations: [ CommentsList, CommentComponent ],
  exports: [ CommentsList, CommentComponent ],
  entryComponents: [ CommentsList ]
})
export class CommentsModule { }
