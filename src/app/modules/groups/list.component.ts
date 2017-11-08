import { Component, OnInit, OnDestroy, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ChannelComponent } from '../channel/channel.component';
import { Client } from '../../common/services/api/client';
import { Storage } from '../../common/services/storage';

import { GroupProfile } from './profile.component';

import { CONFIG, CATEGORIES } from '../../config';

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
  inProgress : boolean = false;

  limit: number = 12;

  components = {
    profile: GroupProfile,
    channel: ChannelComponent
  }

  category : string = 'all';
  categories : Array<{id, label}> = CATEGORIES;

  minds = {
    cdn_url: CONFIG.cdnUrl
  }

  constructor(private client : Client, private cd : ChangeDetectorRef, private nav : NavController,
    private storage : Storage, private params: NavParams){
      this.filter = this.params.get('filter');
  }

  ngOnInit(){
    this.loadList(true);
  }

  loadList(refresh: boolean = false) {
    if (this.inProgress) {
      return;
    }

    if (refresh) {
      this.groups = [];
    }

    this.inProgress = true;
    return this.client.get('api/v1/groups/' + this.filter, { limit: 12, offset: this.offset})
      .then(({ groups = [], 'load-next': loadNext = '' }) => {
        if (this.offset && groups) {
          groups.shift();
        }

        this.groups.push(...groups);
        this.inProgress = false;
        this.offset = loadNext;

        this.triggerChanges();
      })
      .catch(e => {
        this.inProgress = false;
        this.triggerChanges();
        throw e;
      });
  }

  refresh(puller){
    puller.complete();
    this.offset = "";
    this.loadList()
      .then(() => {
        puller.complete();
        this.triggerChanges();
      });
  }

  loadMore(e){
    this.loadList()
      .then(() => {
        e.complete();
        this.triggerChanges();
      });
  }

  setCategory(category : string){
    this.category = category;
    if(this.category == 'all'){
      this.loadList(true);
      return;
    }

    this.client.get('api/v1/categories/featured/object/group', {
      categories: this.category,
      limit: this.limit,
      offset: ''
    })
      .then(({ entities = [], 'load-next': loadNext = '' }) => {
        this.inProgress = false;

        this.groups = entities;
        this.offset = loadNext;

        this.triggerChanges();
      })
      .catch(e => {
        this.inProgress = false;
        this.groups = [];
        this.triggerChanges();
      });
  }

  triggerChanges() {
    this.cd.markForCheck();
    this.cd.detectChanges();
  }
}
