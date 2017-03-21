import { Component, OnInit, OnDestroy, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { PopoverController, NavParams } from 'ionic-angular';
import { PhotoViewer } from 'ionic-native';

import { ChannelComponent } from '../channel/channel.component';
import { Client } from '../../common/services/api/client';
import { Storage } from '../../common/services/storage';

import { DiscoveryOptionsComponent } from './options.component';
import { DiscoveryService } from './discovery.service';

import { CONFIG } from '../../config';

@Component({
  moduleId: 'module.id',
  selector: 'discovery-view',
  templateUrl: 'view.component.html',
  //styleUrls: ['list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DiscoveryView {

  guid : string = "";
  entity;
  inProgress : boolean = false;

  components = {
    channel: ChannelComponent
  }

  minds = {
    cdn_url: CONFIG.cdnUrl
  }

  constructor(private client : Client, private params : NavParams, private cd : ChangeDetectorRef, private storage : Storage){}

  ngOnInit(){
    this.guid = this.params.get('guid');
    if(this.params.get('entity')) {
      this.entity = this.params.get('entity')
      this.guid = this.entity.guid;
    };

    this.load();
  }

  load() {
    this.inProgress = true;
    this.client.get(`api/v1/entities/entity/${this.guid}`, {})
      .then(({ entity }) => {
        this.inProgress = false;

        if (!entity) {
          return; // or throw?
        }

        this.entity = entity;
        this.cd.markForCheck();
        this.cd.detectChanges();
      })
      .catch(e => {
        this.inProgress = false;
      });
  }

  openImage(entity : any){
    PhotoViewer.show(`${this.minds.cdn_url}api/v1/archive/thumbnails/${entity.guid}/xlarge`);
  }
}
