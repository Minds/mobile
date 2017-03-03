import { Component, OnInit, OnDestroy, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ChannelComponent } from '../channel/channel.component';
import { Client } from '../../common/services/api/client';
import { Storage } from '../../common/services/storage';

import { GroupProfile } from './profile.component';

import { CONFIG } from '../../config';

@Component({
  moduleId: 'module.id',
  selector: 'groups-list',
  templateUrl: 'list.component.html',
  //styleUrls: ['list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class GroupsList {

  filter : string = 'member';
  groups : Array<any> = [];
  offset : string = "";
  inProgress : boolean = true;

  components = {
    profile: GroupProfile,
    channel: ChannelComponent
  }

  minds = {
    cdn_url: CONFIG.cdnUrl
  }

  constructor(private client : Client, private cd : ChangeDetectorRef, private nav : NavController,
    private storage : Storage){

  }

  ngOnInit(){
    this.loadList();
  }

  loadList(){
    return new Promise((res, err) => {
      this.inProgress = true;
      this.client.get('api/v1/groups/' + this.filter, { limit: 12, offset: this.offset})
        .then((response : any) => {
          //console.log(response);
          for(let group of response.groups){
            this.groups.push(group);
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
    puller.complete();
    this.offset = "";
    this.loadList()
      .then(() => {
        puller.complete();
      });
  }

  loadMore(e){
    this.loadList()
      .then(() => {
        e.complete();
      });
  }

}
