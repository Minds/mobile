import { Component, OnInit, OnDestroy, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { ChannelComponent } from '../channel/channel.component';
import { Client } from '../../common/services/api/client';
import { Storage } from '../../common/services/storage';


@Component({
  moduleId: 'module.id',
  selector: 'notifications-list',
  templateUrl: 'list.component.html',
  //styleUrls: ['list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class NotificationsList {

  notifications : Array<any> = [];
  offset : string = "";
  inProgress : boolean = true;

  components = {
    channel: ChannelComponent
  }

  storage = new Storage();


  constructor(private client : Client, private cd : ChangeDetectorRef){}

  ngOnInit(){
    this.loadList();
  }

  loadList(){
    return new Promise((res, err) => {
      this.inProgress = true;
      this.client.get('api/v1/notifications', { limit: 12, offset: this.offset})
        .then((response : any) => {
          console.log(response);
          for(let notification of response.notifications){
            this.notifications.push(notification);
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
    this.notifications = [];
    this.loadList()
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

}
