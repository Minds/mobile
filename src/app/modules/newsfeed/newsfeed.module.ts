import { NgModule }     from '@angular/core';
import { IonicModule } from 'ionic-angular';


import { Client } from '../../common/services/api/client';
import { NewsfeedList } from './list.component';
import { NewsfeedSingleComponent } from './single.component';
import { Activity } from './activity/activity.component';
import { BatchActivity } from './activity/batch-activity.component';
import { ImageActivity } from './activity/image-activity.component';
import { RichActivity } from './activity/rich-activity.component';
import { Remind } from './activity/remind.component';
import { ButtonsModule } from '../buttons/buttons.module';

import { ImageCachePipe } from '../../common/pipes/image-cache.pipe';
import { DomainPipe } from '../../common/pipes/domain.pipe';

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
  imports: [ IonicModule, ButtonsModule ],
  providers: [ Client ],
  declarations: [ NewsfeedList, NewsfeedSingleComponent, Activity, ImageActivity, BatchActivity, RichActivity, Remind, ImageCachePipe, DomainPipe ],
  exports: [ NewsfeedList, NewsfeedSingleComponent, Activity, ImageActivity, BatchActivity, RichActivity, Remind ],
  entryComponents: [ NewsfeedList, NewsfeedSingleComponent ]
})
export class NewsfeedModule { }
