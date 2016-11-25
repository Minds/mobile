import { NgModule }     from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { NativeScriptModule } from "nativescript-angular/platform";

import { Client } from '../../common/services/api/client';
import { ChannelComponent } from './channel.component';
import { NewsfeedModule } from '../newsfeed/newsfeed.module';

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
  imports: [ NativeScriptModule, NativeScriptRouterModule, NewsfeedModule ],
  providers: [ Client ],
  declarations: [ ChannelComponent ],
  exports: [ ChannelComponent ]
})
export class ChannelModule { }
