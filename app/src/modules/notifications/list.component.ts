import { Component, OnInit, OnDestroy, Input, ChangeDetectionStrategy } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import * as appSettings from "application-settings";

import { Client } from '../../common/services/api/client';

@Component({
  moduleId: module.id,
  selector: 'notifications-list',
  templateUrl: 'list.component.html',
  styleUrls: ['list.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})

export class NotificationsList {

  notifications : Array<any> = [];
  offset : string = "";
  inProgress : boolean = false;

  constructor(private client : Client, private routerExtensions : RouterExtensions){}

  ngOnInit(){
    this.loadList();
  }

  loadList(){
    this.client.get('api/v1/notifications', { limit: 12, offset: this.offset})
      .then((response : any) => {
        console.log(response);
        for(let notification of response.notifications){
          this.notifications.push(notification);
        }
        this.offset = response['load-next'];
      });
  }

  refresh(puller){
    this.offset = "";
    this.notifications = [];
    this.loadList();
    puller.refreshing = false;
  }

  loadMore(){
    console.log('load more triggered');
    this.loadList();
  }

}
