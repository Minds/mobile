import { Component, OnInit, OnDestroy, Input, ChangeDetectionStrategy } from '@angular/core';
import { CacheService } from '../../../common/services/cache/cache.service';

import { ChannelComponent } from '../../channel/channel.component';
import { NewsfeedSingleComponent } from '../../newsfeed/single.component';



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
    cdn_url: 'https://edge.minds.com/'
  }

  components = {
    activity: NewsfeedSingleComponent,
    channel: ChannelComponent
  }

  constructor(public cache : CacheService){

  }

  @Input('entity') set _entity(entity){
    this.entity = entity;
    this.cache.set('channel:' + entity.fromObj.guid, entity.fromObj, false);
  }

  onLoaded(){
    console.log('fully loaded');
  }

}
