import { Component, OnInit, OnDestroy, Input, Output, ChangeDetectionStrategy, ChangeDetectorRef, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Page } from "ui/page";
import { Client } from '../../common/services/api/client';
import { CacheService } from '../../common/services/cache/cache.service';
import { VisibilityServiceInterface } from "../../common/services/visibility/visibility-service.interface";

@Component({
  moduleId: 'module.id',
  selector: 'group-feed',
  templateUrl: 'feed.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class GroupFeedComponent {

  group;
  guid;

  feed : Array<any> = [];
  offset : string = "";
  inProgress : boolean = true;
  @Input() visibilityService: VisibilityServiceInterface;

  constructor(private client : Client, private cache : CacheService, private cd : ChangeDetectorRef){ }

  @Input('group') set _group(group : any){
    if(!group)
      return;

    this.inProgress = true;

    this.group = group;
    this.guid = group.guid;
    this.loadList(true)
      .then(() => {
        this.detectChanges();
      });
  }

  loadList(refresh : boolean = false){
    if(refresh){
      this.offset = "";
      this.feed = [];
    }

    return this.client.get('api/v1/newsfeed/container/' + this.guid, { limit: 12, offset: this.offset})
      .then((response : any) => {
        if(response.activity){
          this.feed.push(...response.activity);

          //this.cache.set('feed:' + channel.guid, this.feed, true);
          this.inProgress = false;
          this.offset = response['load-next'];
          this.detectChanges();
          this.visibilityService.refresh();
        }

        return true;

      });
  }

  loadMore(loader) {
    this.loadList()
      .then(() => {
        loader.complete();
        this.detectChanges();
      });
  }

  delete(activity) {
    let i: any;
    for(i in this.feed){
      if(this.feed[i] == activity){
        this.feed.splice(i,1);
        this.detectChanges();
      }
    }
  }

  private detectChanges() {
    this.cd.markForCheck();
    this.cd.detectChanges();
  }

}
