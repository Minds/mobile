import { NgModule }     from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { NativeScriptModule } from "nativescript-angular/platform";

import { Client } from '../../common/services/api/client';
import { NewsfeedList } from './list.component';
import { NewsfeedSingle } from './single';
import { Activity } from './activity/activity.component';
import { Remind } from './activity/remind.component';

import { ImageCachePipe } from '../../common/pipes/image-cache.pipe';
import { ImageGarbageCollectDirective } from '../../common/directives/image-garbage-collect.directive';

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
  imports: [ NativeScriptModule, NativeScriptRouterModule ],
  providers: [ Client ],
  declarations: [ NewsfeedList, NewsfeedSingle, Activity, Remind, ImageCachePipe, ImageGarbageCollectDirective ],
  exports: [ NewsfeedList, NewsfeedSingle, Activity, Remind ]
})
export class NewsfeedModule { }
