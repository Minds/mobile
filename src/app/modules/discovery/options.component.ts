import { Component, OnInit, OnDestroy, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { PhotoViewer } from 'ionic-native';

import { ChannelComponent } from '../channel/channel.component';
import { DiscoveryService } from './discovery.service';
import { Client } from '../../common/services/api/client';
import { Storage } from '../../common/services/storage';


@Component({
  moduleId: 'module.id',
  selector: 'discovery-options',
  templateUrl: 'options.component.html',
  //styleUrls: ['list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DiscoveryOptionsComponent {

  callback : Function;

  constructor(private client : Client, private params : NavParams, private viewCtrl : ViewController, private cd : ChangeDetectorRef,
    private service : DiscoveryService){
  }

  showVideos(){
    //this.service.setType('object/video')

  }

  setType(type : string){
    this.service.setType(type);
    this.service.get(true);
    this.viewCtrl.dismiss();
  }

  setFilter(filter : string){
    this.service.setFilter(filter);
    this.service.get(true);
    this.viewCtrl.dismiss();
  }


}
