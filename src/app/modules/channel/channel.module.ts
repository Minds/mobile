import { NgModule }     from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { Client } from '../../common/services/api/client';
import { ChannelComponent } from './channel.component';
import { ChannelFeedComponent } from './feed.component';
import { NewsfeedModule } from '../newsfeed/newsfeed.module';
import { CommonModule } from '../../common/common.module';

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
  imports: [ IonicModule, NewsfeedModule, CommonModule ],
  providers: [ Client ],
  declarations: [ ChannelComponent, ChannelFeedComponent ],
  exports: [ ChannelComponent ],
  entryComponents: [ ChannelComponent ]
})
export class ChannelModule { }
