import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Page } from "ui/page";
import { Client } from '../../common/services/api/client';
import { CacheService } from '../../common/services/cache/cache.service';
import * as applicationModule from "application";

@Component({
  moduleId: module.id,
  selector: 'channel-feed',
  templateUrl: 'feed.component.html',
  styleUrls: [ 'feed.component.css' ]
})

export class ChannelFeedComponent {

  feed : Array<any> = [];
  @Input() channel;

  constructor(private client : Client, private cache : CacheService){ }

  ngOnInit(){
    this.loadFeed();
  }


  loadFeed(){
    this.client.get('api/v1/newsfeed/personal/' + this.channel.guid, { limit: 12, offset: ""})
      .then((response : any) => {
        //console.log(response);
        for(let activity of response.activity){
          this.feed.push(activity);
        }
        //this.offset = response['load-next'];
      });
  }

  refresh(){

  }

}
