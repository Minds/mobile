import { Component, OnInit, OnDestroy, Input, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Content, Refresher } from 'ionic-angular';

import { ChannelComponent } from '../channel/channel.component';
import { Client } from '../../common/services/api/client';
import { Storage } from '../../common/services/storage';
import { BoostSliderComponent } from "./boost/slider.component";


@Component({
  moduleId: 'module.id',
  selector: 'newsfeed-list',
  templateUrl: 'list.component.html',
  //styleUrls: ['list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class NewsfeedList {

  @ViewChild('scrollArea') scrollArea : Content;
  @ViewChild('boostsSlider') boostSlider: BoostSliderComponent;

  feed : Array<any> = [];
  offset : string = "";
  inProgress : boolean = true;

  components = {
    channel: ChannelComponent
  }

  constructor(private client : Client, private cd : ChangeDetectorRef, private storage : Storage){}

  ngOnInit(){
    this.loadList();
  }

  loadList(refresh : boolean = false){
    return new Promise((res, err) => {
      this.inProgress = true;
      this.client.get('api/v1/newsfeed', { limit: 12, offset: this.offset})
        .then((response : any) => {

          if(refresh)
            this.feed = [];

          for(let activity of response.activity){
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
    this.loadList(true)
      .then(() => {
        puller.complete();
        this.cd.markForCheck();
        this.cd.detectChanges();
      });

    this.boostSlider.refresh();
  }

  loadMore(e){
    this.loadList()
      .then(() => {
        e.complete();
      });
  }

  @ViewChild('refresher') refresher : Refresher;
  ionSelected(){
    //this.refresher._beginRefresh();
    //this.cd.markForCheck();
    //this.cd.detectChanges();
    this.scrollArea.scrollToTop(0);
    this.offset = "";
    this.loadList(true)
      .then(() => {
        this.cd.markForCheck();
        this.cd.detectChanges();
      });
  }

  delete(activity) {
    let i: any;
    for(i in this.feed){
      if(this.feed[i] == activity){
        this.feed.splice(i,1);
        this.cd.markForCheck();
        this.cd.detectChanges();
      }
    }
  }

}
