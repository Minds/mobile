import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef, Host } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Page } from "ui/page";
import { Client } from '../../common/services/api/client';
import { CacheService } from '../../common/services/cache/cache.service';
import { CONFIG } from '../../config';
import { DiscoveryView } from '../discovery/view.component';
import { VisibilityServiceInterface } from "../../common/services/visibility/visibility-service.interface";

@Component({
  moduleId: 'module.id',
  selector: 'channel-feed',
  templateUrl: 'feed.component.html',
  //styleUrls: [ 'feed.component.css' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ChannelFeedComponent {


  guid;

  type : string = "activity";
  feed : Array<any> = [];
  offset : string = "";
  inProgress : boolean = false;

  components = {
    view: DiscoveryView
  }

  minds = {
    cdn_url: CONFIG.cdnUrl
  }

  @Output() done : EventEmitter<any> = new EventEmitter();

  constructor(private client : Client, private cache : CacheService, private cd : ChangeDetectorRef){ }

  @Input() set channel(channel : any){
    this.guid = channel.guid;
    this.loadList(true)
      .then(() => {
        this.cd.markForCheck();
        this.cd.detectChanges();
      });
  }

  @Input('type') set _type(type : string){
    this.type = type;
    this.feed = [];
    this.cd.markForCheck();
    this.cd.detectChanges();
    this.loadList(true)
      .then(() => {
        this.cd.markForCheck();
        this.cd.detectChanges();
      });
  }

  @Input() visibilityService: VisibilityServiceInterface;

  loadList(refresh : boolean = false){
    if(!this.guid || this.inProgress)
      return new Promise((resolve, reject) => { reject(true) }); //has to be a promise!

    this.inProgress = true;

    if(refresh)
      this.offset = "";
    switch(this.type){
      case "activity":
        return this.client.get('api/v1/newsfeed/personal/' + this.guid, { limit: 12, offset: this.offset })
          .then((response : any) => {

            if(refresh)
              this.feed = [];

            if (response.activity) {
              this.feed.push(...response.activity);
              this.offset = response['load-next'];
            }

            this.inProgress = false;
            return true;
          })
          .then(() => {
            this.cd.markForCheck();
            this.cd.detectChanges();
            this.inProgress = false;
            this.visibilityService.refresh();
          });
      case "video":
      case "image":
        return this.client.get(`api/v1/entities/owner/${this.type}/${this.guid}`, { limit: 12, offset: this.offset })
          .then((response : any) => {

            if(refresh)
              this.feed = [];

            for(let entity of response.entities){
              this.feed.push(entity);
            }
            this.inProgress = false;
            this.offset = response['load-next'];
            return true;
          })
          .then(() => {
            this.cd.markForCheck();
            this.cd.detectChanges();
            this.inProgress = false;
          });
    }
  }

  @Input() set loadMore(e){
    this.loadList()
      .then(() => {
        e.complete();
        this.done.next(true);
      })
      .catch(() => {
        e.complete();
        this.done.next(true);
      })
  }

  refresh(e){

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
