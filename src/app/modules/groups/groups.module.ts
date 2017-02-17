import { NgModule }     from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { CommonModule } from '../../common/common.module';
import { NewsfeedModule } from '../newsfeed/newsfeed.module';
import { GroupProfile } from './profile.component';
import { GroupFeedComponent } from './feed.component';
import { GroupsList } from './list.component';

@NgModule({
  imports: [ IonicModule, NewsfeedModule, CommonModule ],
  declarations: [ GroupProfile, GroupFeedComponent, GroupsList ],
  exports: [ GroupProfile, GroupFeedComponent, GroupsList ],
  entryComponents: [ GroupProfile, GroupsList ]
})
export class GroupsModule { }
