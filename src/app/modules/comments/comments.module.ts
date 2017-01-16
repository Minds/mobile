import { NgModule }     from '@angular/core';
import { IonicModule } from 'ionic-angular';


import { Client } from '../../common/services/api/client';

import { CommentsList } from './list.component';

@NgModule({
  imports: [ IonicModule ],
  providers: [ Client ],
  declarations: [ CommentsList ],
  exports: [ CommentsList ],
  entryComponents: [ CommentsList ]
})
export class CommentsModule { }
