import { Component, OnInit, OnDestroy, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
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
  styleUrls: ['list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class NewsfeedList {

  feed : Array<any> = [];
  offset : string = "";
  inProgress : boolean = true;

  constructor(private client : Client, private routerExtensions : RouterExtensions, private cd : ChangeDetectorRef){}

  ngOnInit(){
    this.loadList();
  }

  loadList(){
    return new Promise((res, err) => {
      this.inProgress = true;
      this.client.get('api/v1/newsfeed', { limit: 12, offset: this.offset})
        .then((response : any) => {
          //console.log(response);
          for(let activity of response.activity){
            if(activity.remind_object){
              activity = activity.remind_object;
            }
            this.feed.push(activity);
          }
          this.inProgress = false;
          this.offset = response['load-next'];
          res();
          this.cd.markForCheck();
          this.cd.detectChanges();
        });
    });
  }

  refresh(puller){
    this.offset = "";
    this.feed = [];
    this.loadList()
      .then(() => {
        puller.refreshing = false;
      })
  }

  loadMore(){
    this.loadList();
  }

  logout(){
    appSettings.clear();
    this.routerExtensions.navigate(['/login'], { clearHistory: true });
  }

  public templateSelector = (entity, index: number, items: any) => {
    let key = 'default';
    if(entity.perma_url && entity.title){
      key = "rich-activity";
    }
    else if (entity.thumbnail_src && !entity.perma_url) {
      key = "image-activity";
    }
    else if (entity.custom_type == 'batch') {
      key = "batch-activity";
    }

    console.log(key);

    // else if (entity.custom_type == 'video' ){
    //   return "video";
    // }
    return key;
  }

}
