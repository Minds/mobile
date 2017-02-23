import { Component, OnInit, OnDestroy, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { LoadingController } from 'ionic-angular';

import { ChannelComponent } from '../channel/channel.component';
import { Client } from '../../common/services/api/client';
import { Storage } from '../../common/services/storage';
import { NotificationService } from './notification.service';
import { NotificationSettingsComponent } from './settings.component';

@Component({
  moduleId: 'module.id',
  selector: 'notifications-list',
  templateUrl: 'list.component.html',
  //styleUrls: ['list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class NotificationsList {

  notifications : Array<any> = [];
  filter : string = "all";
  offset : string = "";
  inProgress : boolean = true;

  components = {
    channel: ChannelComponent,
    settings: NotificationSettingsComponent
  }

  storage = new Storage();

  loader = this.loadingCtrl.create({
    content: "Please wait...",
  });

  constructor(private client : Client, private loadingCtrl : LoadingController, private cd : ChangeDetectorRef,
    private service : NotificationService){}

  ionViewDidEnter(){
    this.loader.present();
    this.loadList();
  }

  loadList(refresh : boolean = false){
    if(this.refresh)
      this.offset = '';
    this.service.clear();
    return new Promise((res, err) => {
      this.inProgress = true;
      this.client.get('api/v1/notifications/' + this.filter, { limit: 12, offset: this.offset })
        .then((response : any) => {
          if(refresh)
            this.notifications = [];
          this.loader.dismiss();
          for(let notification of response.notifications){
            this.notifications.push(notification);
          }
          this.inProgress = false;
          this.offset = response['load-next'];
          res();
          this.cd.markForCheck();
          this.cd.detectChanges();
        })
        .catch(() => {
          this.loader.dismiss();
        })
    });
  }

  refresh(puller){
    this.loadList(true)
      .then(() => {
        puller.complete();
      });
  }

  loadMore(e){
    console.log('load more triggered');
    this.loadList()
      .then(() => {
        e.complete();
      })
  }

  setFilter(filter : string){
    this.filter = filter;
    this.loadList(true);
  }

  ngOnDestroy(){
    this.loader.dismiss();
  }

}
