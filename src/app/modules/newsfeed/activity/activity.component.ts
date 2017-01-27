import { Component, OnInit, OnDestroy, Input, ChangeDetectionStrategy, ChangeDetectorRef, HostListener } from '@angular/core';
import { ActionSheetController, ModalController } from 'ionic-angular'
import { CacheService } from '../../../common/services/cache/cache.service';
import { Storage } from '../../../common/services/storage';
import { Client } from '../../../common/services/api/client';
import { ChannelComponent } from '../../channel/channel.component';
import { BoostComponent } from '../boost/boost.component';


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

  minds = {
    cdn_url: 'https://edge.minds.com/'
  }

  components = {
    channel: ChannelComponent
  }

  constructor(private client : Client, public cache : CacheService, public actionSheetCtrl: ActionSheetController,
    private cd : ChangeDetectorRef, private storage : Storage, private modalCtrl : ModalController){

  }

  @Input('entity') set _entity(entity){

    if(entity.remind_object){
      this.entity = entity.remind_object;
      this.entity.reminderOwnerObj = entity.ownerObj;
      this.entity.remind_object = false; //stop remind looping, if it even happens
      this.entity.boosted = entity.boosted;
    } else {
      this.entity = entity;
    }
    //this.cache.set('channel:' + entity.ownerObj.guid, entity.ownerObj, false);
  }

  openInBrowser(url){
    (<any>window).open(url, "_system");
  }

  @HostListener('press', ['$event'])
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


}
