import { Component, OnInit, OnDestroy, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Page } from "ui/page";
import { Client } from '../../common/services/api/client';
import { CacheService } from '../../common/services/cache/cache.service';
import * as applicationModule from "application";

@Component({
  moduleId: module.id,
  selector: 'channel',
  templateUrl: 'channel.component.html',
  styleUrls: [ 'channel.component.css' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ChannelComponent {

  android = applicationModule.android;
  guid : string = "me";
  channel;

  constructor(private client : Client, private route: ActivatedRoute, private router: Router, page : Page,  private cache : CacheService,
    private cd: ChangeDetectorRef){
    //if(applicationModule.android)
    //  page.actionBarHidden = true;
  }

  ngOnInit(){
    this.route.params.subscribe((params) => {

      if(this.router.url.indexOf('/tab') > -1)
        return;

      this.channel = null;
      this.feed = [];
      this.guid = params['id'];
      this.load();
    });
  }

  @Input() set username(value : string){
    this.channel = null;
    this.guid = value;
    this.load();
  }

  //ngAfterViewInit() {
    //this.loadFeed();
  //}

  load(){
    let _channel = this.cache.get('channel:' + this.guid);
    if(_channel){
      this.channel = _channel;
      this.cd.markForCheck();
      this.cd.detectChanges();
      return true;
    }

    this.client.get('api/v1/channel/' + this.guid)
      .then((response : any) => {
        this.channel = response.channel;
        this.cache.set('channel:' + this.guid, this.channel, true);
        this.cd.markForCheck();
        this.cd.detectChanges();
      });
  }

  refresh(){

  }

}
