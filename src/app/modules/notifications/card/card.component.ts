import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CacheService } from '../../../common/services/cache/cache.service';
import { Client } from '../../../common/services/api/client';
import { Storage } from '../../../common/services/storage';

import { ChannelComponent } from '../../channel/channel.component';
import { NewsfeedSingleComponent } from '../../newsfeed/single.component';
import { GroupProfile } from '../../groups/profile.component';
import { DiscoveryView } from "../../discovery/view.component";
import { BlogView } from "../../blog/view.component";

import { CONFIG } from '../../../config';
import { Reason, rejectionReasons } from '../../boost/rejection-reasons';

@Component({
  moduleId: 'module.id',
  selector: 'notification-card',
  templateUrl: 'card.component.html',
  //styleUrls: ['card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
  ////styleUrls: ['activity.component.css']
})

export class NotificationCard {

  entity;

  minds = {
    cdn_url: CONFIG.cdnUrl
  };

  components = {
    activity: NewsfeedSingleComponent,
    channel: ChannelComponent,
    group: GroupProfile,
    entityView: DiscoveryView,
    blogView: BlogView,
  };


  constructor(public cache : CacheService, private client : Client, public storage : Storage){

  }

  @Input('entity') set _entity(entity){
    this.entity = entity;
    this.cache.set('channel:' + entity.fromObj.guid, entity.fromObj, false);
  }

  onLoaded(){
    console.log('fully loaded');
  }

  subscribe(){
    this.entity.fromObj.subscribed = true;
    this.client.post('api/v1/subscribe/' + this.entity.fromObj.guid, {})
      .then((response : any) => {
          this.entity.fromObj.subscribed = true;
      })
      .catch((e) => {
        this.entity.fromObj.subscribed = false;
      });
  }

  findReason(code: number) {
    return rejectionReasons.find((item: Reason) => {
      return item.code == code;
    });
  }

}
