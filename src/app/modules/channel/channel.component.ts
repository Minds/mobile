import { Component, OnInit, OnDestroy, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { Client } from '../../common/services/api/client';
import { CacheService } from '../../common/services/cache/cache.service';


@Component({
  moduleId: 'module.id',
  selector: 'channel',
  templateUrl: 'channel.component.html',
  //styleUrls: [ 'channel.component.css' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ChannelComponent {


  guid : string = "me";
  channel : any = {};

  constructor(private client : Client, private params: NavParams, private cache : CacheService,
    private cd: ChangeDetectorRef){
    //if(applicationModule.android)
    //  page.actionBarHidden = true;
  }

  ngOnInit(){
    this.guid = this.params.get('guid');
    if(this.params.get('channel')){
      this.channel = this.params.get('channel');
      if(this.channel){
        this.guid = this.channel.guid;
        //return;
      }
    }

    this.load();
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
    if(_channel && !this.channel){
      this.channel = _channel;
      this.cd.markForCheck();
      this.cd.detectChanges();
      //return true;
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
