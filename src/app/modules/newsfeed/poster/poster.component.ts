import { Component, OnInit, OnDestroy, Input, ChangeDetectionStrategy } from '@angular/core';
import { CacheService } from '../../../common/services/cache/cache.service';
import { ChannelComponent } from '../../channel/channel.component';
import { Storage } from '../../../common/services/storage';

@Component({
  moduleId: 'module.id',
  selector: 'newsfeed-poster',
  templateUrl: 'poster.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PosterComponent {

  entity;

  minds = {
    cdn_url: 'https://edge.minds.com/'
  }

  components = {
    channel: ChannelComponent
  }

  storage = new Storage();

  constructor(public cache : CacheService){

  }

}
