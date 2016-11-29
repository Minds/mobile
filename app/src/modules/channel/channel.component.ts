import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Page } from "ui/page";
import { Client } from '../../common/services/api/client';
import { CacheService } from '../../common/services/cache/cache.service';
import * as applicationModule from "application";

@Component({
  moduleId: module.id,
  selector: 'channel',
  templateUrl: 'channel.component.html',
  styleUrls: [ 'channel.component.css' ]
})

export class ChannelComponent {

  feed : Array<any> = [];
  guid : string = "me";
  channel;

  constructor(private client : Client, private route: ActivatedRoute, page : Page, private cache : CacheService){
    if(applicationModule.android)
      page.actionBarHidden = true;
  }

  ngOnInit(){
    this.route.params.subscribe((params) => {
      this.channel = null;
      this.feed = [];
      this.guid = params['id'];
      this.load();

    });
  }

  //ngAfterViewInit() {
    //this.loadFeed();
  //}

  load(){
    let _channel = this.cache.get('channel:' + this.guid);
    if(_channel){
      this.channel = _channel;
      return true;
    }

    this.client.get('api/v1/channel/' + this.guid)
      .then((response : any) => {
        this.channel = response.channel;
        this.cache.set('channel:' + this.guid, this.channel, true);
      });
  }

  refresh(){

  }

}
