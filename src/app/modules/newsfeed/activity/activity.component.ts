import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef, HostListener } from '@angular/core';
import { ActionSheetController, ModalController, PopoverController, Platform, Nav } from 'ionic-angular'
import { PhotoViewer } from 'ionic-native';

import { CacheService } from '../../../common/services/cache/cache.service';
import { Storage } from '../../../common/services/storage';
import { Client } from '../../../common/services/api/client';
import { ChannelComponent } from '../../channel/channel.component';
import { BoostComponent } from '../boost/boost.component';
import { BlogView } from '../../blog/view.component';
import { NewsfeedSingleComponent } from '../single.component';
import { LanguagesComponent } from '../../translations/languages.component';
import { ReportService } from '../../report/report.service';

@Component({
  moduleId: 'module.id',
  selector: 'activity',
  templateUrl: 'activity.component.html',
  //styleUrls: ['activity.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
  ////styleUrls: ['activity.component.css']
})

export class Activity {

  entity;
  editing : boolean = false;
  @Output() deleted : EventEmitter<any> = new EventEmitter();

  minds = {
    cdn_url: 'https://edge.minds.com/'
  }

  components = {
    channel: ChannelComponent
  }

  language : string = '';

  constructor(private client : Client, public cache : CacheService, public actionSheetCtrl: ActionSheetController,
    private cd : ChangeDetectorRef, private storage : Storage, private modalCtrl : ModalController, private platform : Platform,
    private navCtrl : Nav, private popoverCtrl : PopoverController, private report : ReportService){

  }

  @Input('entity') set _entity(entity){

    if(entity.remind_object){
      this.entity = entity.remind_object;
      this.entity.guid = entity.guid;
      this.entity.reminderOwnerObj = entity.ownerObj;
      this.entity.remind_object = false; //stop remind looping, if it even happens
      this.entity.boosted = entity.boosted;
      this.entity.impressions = entity.impressions;
      this.entity['thumbs:up:count'] = entity['thumbs:up:count'];
      this.entity['thumbs:down:count'] = entity['thumbs:down:count'];
      this.entity.remind_count = entity.remind_count;
    } else {
      this.entity = entity;
    }
    //this.cache.set('channel:' + entity.ownerObj.guid, entity.ownerObj, false);
  }

  openInBrowser(url){
    if(url.indexOf('minds.com/blog/view') > -1){
      let parts = url.split('/');
      this.modalCtrl.create(BlogView, { guid: parts[parts.length-1]})
        .present();
      return;
    }
    if(url.indexOf('minds.com/newsfeed/') > -1){
      let parts = url.split('/');
      this.navCtrl.push(NewsfeedSingleComponent, { guid: parts[parts.length-1]});
      return;
    }
    (<any>window).open(url, "_system");
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
          this.client.delete('api/v1/newsfeed/' + this.entity.guid);
          this.deleted.next(true);
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
        this.popoverCtrl.create(LanguagesComponent, {
          callback: (language) => {
            this.language = language;
            this.cd.markForCheck();
            this.cd.detectChanges();
          }
        })
        .present();
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
        this.report.report(this.entity.guid);
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
    this.client.post('api/v1/newsfeed/' + this.entity.guid, {
      message: this.entity.message,
      title: this.entity.title
    });
    this.editing = false;
    this.cd.markForCheck();
    this.cd.detectChanges();
  }

  boost(){
    this.modalCtrl.create(BoostComponent, { entity: this.entity })
      .present();
  }

  canAutoplay(){
    if(this.platform.is('ios'))
      return false; //ios can't inline play
    return this.storage.get('autoplay');
  }

  openImage(){
    PhotoViewer.show('https://edge.minds.com/api/v1/archive/thumbnails/' + this.entity.entity_guid + '/xlarge');
  }

}
