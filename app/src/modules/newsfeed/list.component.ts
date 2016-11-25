import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import * as appSettings from "application-settings";
import {registerElement} from "nativescript-angular/element-registry";
registerElement("PullToRefresh", () => {
    var viewClass = require("nativescript-pulltorefresh").PullToRefresh;
    return viewClass;
});

import { Client } from '../../common/services/api/client';

@Component({
  moduleId: module.id,
  selector: 'newsfeed-list',
  templateUrl: 'list.component.html',
  styleUrls: ['list.component.css']
})

export class NewsfeedList {

  feed : Array<any> = [];
  offset : string = "";
  inProgress : boolean = false;

  constructor(private client : Client, private routerExtensions : RouterExtensions){}

  ngOnInit(){
    this.loadList();
  }

  loadList(){
    this.client.get('api/v1/newsfeed', { limit: 12, offset: this.offset})
      .then((response : any) => {
        console.log(response);
        for(let activity of response.activity){
          this.feed.push(activity);
        }
        this.offset = response['load-next'];
      });
  }

  refresh(puller){
    this.offset = "";
    this.feed = [];
    this.loadList();
    puller.refreshing = false;
  }

  loadMore(){
    console.log('load more triggered');
    this.loadList();
  }

  logout(){
    appSettings.clear();
    this.routerExtensions.navigate(['/login'], { clearHistory: true });
  }

}
