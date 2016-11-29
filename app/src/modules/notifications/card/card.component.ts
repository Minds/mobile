import { Component, OnInit, OnDestroy, Input, ChangeDetectionStrategy } from '@angular/core';
import { CacheService } from '../../../common/services/cache/cache.service';
import * as imageSource from "image-source";
import { RouterExtensions } from 'nativescript-angular/router';
import * as appSettings from "application-settings";
import * as applicationModule from "application";

@Component({
  moduleId: module.id,
  selector: 'notification-card',
  templateUrl: 'card.component.html',
  styleUrls: ['card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
  //styleUrls: ['activity.component.css']
})

export class NotificationCard {

  entity;
  android = applicationModule.android;

  constructor(public cache : CacheService){

  }

  @Input('entity') set _entity(entity){
    this.entity = entity;
    this.cache.set('channel:' + entity.ownerObj.guid, entity.ownerObj, false);
  }

  onLoaded(){
    console.log('fully loaded');
  }

}
