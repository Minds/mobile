import { Component, OnInit, OnDestroy, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NavParams, LoadingController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';

import { Client } from '../../common/services/api/client';
import { Upload } from '../../common/services/api/upload';
import { CacheService } from '../../common/services/cache/cache.service';
import { Storage } from '../../common/services/storage';
import { ChannelComponent } from './channel.component';

import { CONFIG } from '../../config';

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
  moreData: boolean = true;

  components = {
    channel : ChannelComponent
  }

  minds = {
    cdn_url: CONFIG.cdnUrl
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
      if (refresh) {
        this.offset = "";
        this.moreData = true;
      }

      this.client.get('api/v1/subscribe/' + this.filter + '/' + this.guid, {
          offset: this.offset
        })
        .then((response : any) => {
          if(refresh)
            this.users = [];

          this.users = this.users.concat(response.users);

          if (response['load-next']) {
            this.offset = response['load-next'];
          } else {
            this.moreData = false;
          }

          this.detectChanges();
          resolve();
        });
    });
  }

  loadMore(e) {
    if (!this.moreData) {
      e.complete();
      return;
    }

    this.load()
      .then(() => {
        e.complete();
        this.detectChanges();
      })
  }

  subscribe(index){
    this.users[index].subscribed = true;
    this.users[index].subscribers_count++;
    this.detectChanges();

    this.client.post('api/v1/subscribe/' + this.users[index].guid, {})
      .then((response : any) => {
        this.users[index].subscribed = true;
      })
      .catch((e) => {
        this.users[index].subscribed = false;
        this.users[index].subscribers_count--;
        this.detectChanges();
      });
  }

  unsubscribe(index){
    this.users[index].subscribed = false;
    this.users[index].subscribers_count--;
    this.detectChanges();

    this.client.delete('api/v1/subscribe/' + this.users[index].guid, {})
      .then((response : any) => {
        this.users[index].subscribed = false;
      })
      .catch((e) => {
        this.users[index].subscribed = true;
        this.users[index].subscribers_count++;
        this.detectChanges();
      });
  }

  detectChanges(){
    this.cd.markForCheck();
    this.cd.detectChanges();
  }

}
