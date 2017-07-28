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
import { BoostComponent } from './boost/boost.component';
import { NewsfeedBoostComponent } from './boost/newsfeed.component';
import { P2PBoostComponent } from './boost/p2p.component';
import { ButtonsModule } from '../buttons/buttons.module';
import { BoostSliderComponent } from "./boost/slider.component";

import { ImageCachePipe } from '../../common/pipes/image-cache.pipe';
import { CommonModule } from '../../common/common.module';
import { BoostCreatorModule } from './../boost/creator/creator.module';
import { HeaderModule } from '../header/header.module';
import { AttachmentModule } from '../attachments/attachment.module';
import { TranslationsModule } from '../translations/translations.module';
import { ReportModule } from '../report/report.module';
import { VideoModule } from "../video/video.module";
import { SuggestionsModule } from '../suggestions/suggestions.module';
import { PaywallModule } from '../paywall/paywall.module';

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
  imports: [
    IonicModule,
    CommonModule,
    BoostCreatorModule,
    ButtonsModule,
    AttachmentModule,
    HeaderModule,
    TranslationsModule,
    ReportModule,
    VideoModule,
    SuggestionsModule,
    PaywallModule
  ],
  providers: [ Client ],
  declarations: [
    NewsfeedList,
    NewsfeedSingleComponent,
    Activity,
    BoostComponent,
    NewsfeedBoostComponent,
    P2PBoostComponent,
    ImageActivity,
    BatchActivity,
    RichActivity,
    Remind,
    PosterComponent,
    ImageCachePipe,
    BoostSliderComponent,
  ],
  exports: [
    NewsfeedList,
    NewsfeedSingleComponent,
    Activity,
    BoostComponent,
    NewsfeedBoostComponent,
    P2PBoostComponent,
    ImageActivity,
    BatchActivity,
    RichActivity,
    Remind,
    PosterComponent
  ],
  entryComponents: [
    NewsfeedList,
    NewsfeedSingleComponent,
    BoostComponent,
    NewsfeedBoostComponent,
    P2PBoostComponent
   ]
})
export class NewsfeedModule { }
