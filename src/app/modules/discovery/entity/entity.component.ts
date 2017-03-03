import { Component, OnInit, OnDestroy, Input, ChangeDetectionStrategy, ChangeDetectorRef, HostListener } from '@angular/core';
import { ActionSheetController, ModalController, Platform } from 'ionic-angular'
import { PhotoViewer } from 'ionic-native';

import { CacheService } from '../../../common/services/cache/cache.service';
import { Storage } from '../../../common/services/storage';
import { Client } from '../../../common/services/api/client';
import { ChannelComponent } from '../../channel/channel.component';
import { BoostComponent } from '../boost/boost.component';

import { CONFIG } from '../../../config';

@Component({
  moduleId: 'module.id',
  selector: 'minds-entity',
  templateUrl: 'entity.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DiscoveryEntity {

  @Input('entity') entity;
  editing : boolean = false;

  minds = {
    cdn_url: CONFIG.cdnUrl
  }

  components = {
    channel: ChannelComponent
  }

  constructor(private client : Client, public cache : CacheService, public actionSheetCtrl: ActionSheetController,
    private cd : ChangeDetectorRef, private storage : Storage, private modalCtrl : ModalController, private platform : Platform){

  }


  //@HostListener('press', ['$event'])
  openSettings(e){
    let buttons = [];

    if(this.storage.get('user_guid') == this.entity.owner_guid){
      buttons.push({
        text: 'Delete',
        role: 'destructive',
        handler: () => {
          //console.log('Destructive clicked');
        }
      });
      buttons.push({
        text: 'Edit',
        handler: () => {
          this.editing = true;
          this.cd.markForCheck();
          this.cd.detectChanges();
          //console.log('Destructive clicked');
        }
      });
    }

    buttons.push({
      text: 'Translate',
      handler: () => {
       console.log('Translate clicked');
      }
    });

    buttons.push({
      text: 'Share',
      handler: () => {
       console.log('Share clicked');
      }
    });

    buttons.push({
      text: 'Report',
      handler: () => {
       console.log('Report clicked');
      }
    });

    buttons.push({
      text: 'Cancel',
      role: 'cancel'
    });

    let actionSheet = this.actionSheetCtrl.create({
      //title: '',
      buttons: buttons
    });
    actionSheet.present();
  }

  save(){
    this.client.post('api/v1/entities/entity/' + this.entity.guid, {
      title: this.entity.title
    });
    this.editing = false;
    this.cd.markForCheck();
    this.cd.detectChanges();
  }

  canAutoplay(){
    if(this.platform.is('ios'))
      return false; //ios can't inline play
    console.log(this.storage.get('disable-autoplay') == 'false');
    return this.storage.get('disable-autoplay') == 'false' ? true : false;
  }

  openImage(){
    PhotoViewer.show(`${this.minds.cdn_url}api/v1/archive/thumbnails/${this.entity.guid}/xlarge`);
  }
}
