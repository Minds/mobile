import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Page } from "ui/page";
import { Client } from '../../common/services/api/client';

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

  constructor(private client : Client, private route: ActivatedRoute, page : Page){
    page.actionBarHidden = false;
  }

  ngOnInit(){
    this.route.params.subscribe((params) => {
      this.channel = null;
      this.feed = [];
      this.guid = params['id'];
      this.load();
      this.loadFeed();
    });
  }

  load(){
    this.client.get('api/v1/channel/' + this.guid)
      .then((response : any) => {
        this.channel = response.channel;
      });
  }

  loadFeed(){
    this.client.get('api/v1/newsfeed/personal/' + this.guid, { limit: 12, offset: ""})
      .then((response : any) => {
        console.log(response);
        for(let activity of response.activity){
          this.feed.push(activity);
        }
        //this.offset = response['load-next'];
      });
  }

  refresh(){

  }

}
