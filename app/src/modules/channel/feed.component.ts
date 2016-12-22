import { Component, OnInit, OnDestroy, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Page } from "ui/page";
import { Client } from '../../common/services/api/client';
import { CacheService } from '../../common/services/cache/cache.service';
import * as applicationModule from "application";

@Component({
  moduleId: module.id,
  selector: 'channel-feed',
  templateUrl: 'feed.component.html',
  styleUrls: [ 'feed.component.css' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ChannelFeedComponent {

  feed : Array<any> = [];
  inProgress : boolean = true;

  constructor(private client : Client, private cache : CacheService, private cd : ChangeDetectorRef){ }

  @Input() set channel(channel : any){
    this.inProgress = true;
    this.feed = [];

    let _feed = this.cache.get('feed:' + channel.guid);
    if(_feed){
      this.feed = _feed;
      this.inProgress = false;
      return;
    }

    this.client.get('api/v1/newsfeed/personal/' + channel.guid, { limit: 12, offset: ""})
      .then((response : any) => {
        //console.log(response);
        for(let activity of response.activity){
          this.feed.push(activity);
        }

        this.cache.set('feed:' + channel.guid, this.feed, true);
        this.inProgress = false;
        this.cd.markForCheck();
        this.cd.detectChanges();
      });
  }

  refresh(){

  }

}
