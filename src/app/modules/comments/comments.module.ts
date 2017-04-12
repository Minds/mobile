import { NgModule }     from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { CommonModule } from '../../common/common.module';
import { Client } from '../../common/services/api/client';
import { ButtonsModule } from '../buttons/buttons.module';
import { ReportModule } from '../report/report.module';

import { CommentsList } from './list.component';
import { CommentComponent } from './comment.component';
import { SuggestionsModule } from "../suggestions/suggestions.module";

@NgModule({
  imports: [ IonicModule, CommonModule, ButtonsModule, ReportModule, SuggestionsModule ],
  providers: [ Client ],
  declarations: [ CommentsList, CommentComponent ],
  exports: [ CommentsList, CommentComponent ],
  entryComponents: [ CommentsList ]
})
export class CommentsModule { }
