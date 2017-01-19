import { NgModule }     from '@angular/core';
import { IonicModule } from 'ionic-angular';


import { Client } from '../../common/services/api/client';
import { NewsfeedList } from './list.component';
import { NewsfeedSingleComponent } from './single.component';
import { Activity } from './activity/activity.component';
import { BatchActivity } from './activity/batch-activity.component';
import { ImageActivity } from './activity/image-activity.component';
import { RichActivity } from './activity/rich-activity.component';
import { PosterComponent } from './poster/poster.component';
import { Remind } from './activity/remind.component';
import { ButtonsModule } from '../buttons/buttons.module';

import { ImageCachePipe } from '../../common/pipes/image-cache.pipe';
import { CommonModule } from '../../common/common.module';
import { AttachmentModule } from '../attachments/attachment.module';

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
  imports: [ IonicModule, CommonModule, ButtonsModule, AttachmentModule ],
  providers: [ Client ],
  declarations: [ NewsfeedList, NewsfeedSingleComponent, Activity, ImageActivity, BatchActivity, RichActivity, Remind, PosterComponent, ImageCachePipe ],
  exports: [ NewsfeedList, NewsfeedSingleComponent, Activity, ImageActivity, BatchActivity, RichActivity, Remind, PosterComponent ],
  entryComponents: [ NewsfeedList, NewsfeedSingleComponent ]
})
export class NewsfeedModule { }
