import { NgModule }     from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { Client } from '../../common/services/api/client';
import { ThumbsUpComponent } from './thumbsup.component';
import { ThumbsDownComponent } from './thumbsdown.component';
import { CommentButtonComponent } from './comment.component';
import { RemindButtonComponent } from './remind.component';

@NgModule({
  /*imports: [
    RouterModule.forChild([
      {
        path: 'newsfeed',
        component: NewsfeedList,
      },
      {
        path: 'newsfeed/:id',
        component: NewsfeedSingle
      }
    ])
  ],
  exports: [
    RouterModule
  ]*/
  imports: [ IonicModule ],
  providers: [ Client ],
  declarations: [ ThumbsUpComponent, ThumbsDownComponent, CommentButtonComponent, RemindButtonComponent ],
  exports: [ ThumbsUpComponent, ThumbsDownComponent, CommentButtonComponent, RemindButtonComponent ]
})
export class ButtonsModule { }
