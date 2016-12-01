import { NgModule }     from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { NativeScriptModule } from "nativescript-angular/platform";

import { Client } from '../../common/services/api/client';
import { NewsfeedList } from './list.component';
import { NewsfeedSingleComponent } from './single.component';
import { Activity } from './activity/activity.component';
import { Remind } from './activity/remind.component';
import { ButtonsModule } from '../buttons/buttons.module';

import { ImageCachePipe } from '../../common/pipes/image-cache.pipe';

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
  imports: [ NativeScriptModule, NativeScriptRouterModule, ButtonsModule ],
  providers: [ Client ],
  declarations: [ NewsfeedList, NewsfeedSingleComponent, Activity, Remind, ImageCachePipe ],
  exports: [ NewsfeedList, NewsfeedSingleComponent, Activity, Remind ]
})
export class NewsfeedModule { }
