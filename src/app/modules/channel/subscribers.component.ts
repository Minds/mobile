import { Component, OnInit, OnDestroy, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NavParams, LoadingController } from 'ionic-angular';
import { Camera } from 'ionic-native';

import { Client } from '../../common/services/api/client';
import { Upload } from '../../common/services/api/upload';
import { CacheService } from '../../common/services/cache/cache.service';
import { Storage } from '../../common/services/storage';
import { ChannelComponent } from './channel.component';

@Component({
  moduleId: 'module.id',
  selector: 'channel',
  templateUrl: 'subscribers.component.html',
  //styleUrls: [ 'channel.component.css' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SubscribersComponent {

  guid : string = "me";
  filter : string = "subscribers";

  users : Array<any> = [];
  offset : string = "";

  components = {
    channel : ChannelComponent
  }

  constructor(private client : Client, private upload : Upload, private params: NavParams, private cache : CacheService,
    private cd: ChangeDetectorRef, private loadingCtrl : LoadingController, private storage : Storage){
  }

  ngOnInit(){
    this.guid = this.params.get('guid');
    this.filter = this.params.get('filter');

    this.load();
  }

  load(refresh : boolean = false){
    return new Promise((resolve, reject) => {
      if(refresh)
        this.offset = "";
      this.client.get('api/v1/subscribe/' + this.filter + '/' + this.guid, {
          offset: this.offset
        })
        .then((response : any) => {
          if(refresh)
            this.users = [];
          this.users = this.users.concat(response.users);
          this.offset = response['load-next'];
          this.cd.markForCheck();
          this.cd.detectChanges();
          resolve();
        });
    });
  }

  loadMore(e){
    this.load()
      .then(() => {
        e.complete();
        this.cd.markForCheck();
        this.cd.detectChanges();
      })
  }

}
