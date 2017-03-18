import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef, HostListener, AfterViewInit, ElementRef } from '@angular/core';
import { ActionSheetController, ModalController, PopoverController, Platform, NavController } from 'ionic-angular'
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
import { ShareService } from '../../share/share.service';
import { GroupProfile } from '../../groups/profile.component';
import { VisibilityServiceInterface } from "../../../common/services/visibility/visibility-service.interface";

import { CONFIG } from '../../../config';

@Component({
  moduleId: 'module.id',
  selector: 'activity',
  templateUrl: 'activity.component.html',
  //styleUrls: ['activity.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
  ////styleUrls: ['activity.component.css']
})

export class Activity implements AfterViewInit, OnDestroy {

  entity;
  rawEntity;
  editing : boolean = false;
  @Output() deleted : EventEmitter<any> = new EventEmitter();

  @Input() visibilityService: VisibilityServiceInterface;
  @Input() visible: boolean = false;

  active: boolean = false;

  minds = {
    cdn_url: CONFIG.cdnUrl,
    base: CONFIG.baseUrl,
  }

  components = {
    channel: ChannelComponent,
    group: GroupProfile
  }

  language : string = '';
  impressionRegistered: boolean = false;

  constructor(private client : Client, public cache : CacheService, public actionSheetCtrl: ActionSheetController,
    private cd : ChangeDetectorRef, private storage : Storage, private modalCtrl : ModalController, private platform : Platform,
    private navCtrl : NavController, private popoverCtrl : PopoverController, private report : ReportService, private share : ShareService, private elementRef: ElementRef){

  }

  ngAfterViewInit() {
    if (this.visibilityService) {
      this.visibilityService.register(this.elementRef, (inViewport) => {
        if (inViewport === this.visibilityService.VISIBLE) {
          this.onShow();
        } else if (inViewport === this.visibilityService.HIDDEN) {
          this.onHide();
        }
      });
    } else if (this.visible) {
      this.onShow();
    }
  }

  ngOnDestroy() {
    if (this.visibilityService) {
      this.visibilityService.unregister(this.elementRef);
    }
  }

  preview: boolean = false;
  @Input('isPreview') set _isPreview(value) {
    this.preview = !!value;
  };

  @Input('entity') set _entity(entity) {
    if(entity.remind_object){
      this.rawEntity = JSON.parse(JSON.stringify(entity.remind_object));

      this.entity = entity.remind_object;
      this.entity.guid = entity.guid;
      if(entity.entity_guid)
        this.entity.entity_guid = entity.entity_guid;
      this.entity.reminderOwnerObj = entity.ownerObj;
      this.entity.reminderMessage = entity.message;
      this.entity.remind_object = false; //stop remind looping, if it even happens
      this.entity.boosted = entity.boosted;
      this.entity.impressions = entity.impressions;
      this.entity['thumbs:up:count'] = entity['thumbs:up:count'];
      this.entity['thumbs:down:count'] = entity['thumbs:down:count'];
      this.entity['comments:count'] = entity['comments:count'];
      this.entity.remind_count = entity.remind_count;
    } else {
      this.rawEntity = JSON.parse(JSON.stringify(entity));
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
       this.share.share('', '', null, this.minds.base + 'newsfeed/' + this.entity.guid);
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

  openImage(){
    PhotoViewer.show(`${this.minds.cdn_url}api/v1/archive/thumbnails/${this.entity.entity_guid}/xlarge`);
  }

  onShow() {
    this.registerImpression();

    this.active = true;

    this.cd.markForCheck();
    this.cd.detectChanges();
  }

  onHide() {
    this.active = false;

    this.cd.markForCheck();
    this.cd.detectChanges();
  }

  registerImpression() {
    if (this.impressionRegistered) {
      return;
    }

    this.impressionRegistered = true;
    this.client.put('api/v1/newsfeed/' + this.entity.guid + '/view');
  }
}
