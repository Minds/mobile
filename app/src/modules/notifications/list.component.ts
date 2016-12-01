import { Component, OnInit, OnDestroy, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import * as appSettings from "application-settings";

import { Client } from '../../common/services/api/client';

@Component({
  moduleId: module.id,
  selector: 'notifications-list',
  templateUrl: 'list.component.html',
  styleUrls: ['list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class NotificationsList {

  notifications : Array<any> = [];
  offset : string = "";
  inProgress : boolean = true;

  constructor(private client : Client, private routerExtensions : RouterExtensions, private cd : ChangeDetectorRef){}

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
        puller.refreshing = false;
      });
  }

  loadMore(){
    console.log('load more triggered');
    this.loadList();
  }

}
