import { NgModule }     from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { CommonModule } from '../../common/common.module';
import { NewsfeedModule } from '../newsfeed/newsfeed.module';
import { GroupProfile } from './profile.component';
import { GroupFeedComponent } from './feed.component';

@NgModule({
  imports: [ IonicModule, NewsfeedModule, CommonModule ],
  declarations: [ GroupProfile, GroupFeedComponent ],
  exports: [ GroupProfile, GroupFeedComponent ],
  entryComponents: [ GroupProfile ]
})
export class GroupsModule { }
