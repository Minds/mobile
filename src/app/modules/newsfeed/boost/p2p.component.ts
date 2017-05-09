import { Component, OnInit, OnDestroy, Input, ChangeDetectionStrategy, ChangeDetectorRef, HostListener, ViewChild } from '@angular/core';
import { Content, AlertController, LoadingController, NavParams, ViewController } from 'ionic-angular';
import { Keyboard } from 'ionic-native';
import { CacheService } from '../../../common/services/cache/cache.service';
import { Storage } from '../../../common/services/storage';
import { Client } from '../../../common/services/api/client';

import { CONFIG } from '../../../config';

@Component({
  moduleId: 'module.id',
  selector: 'p2p-boost',
  templateUrl: 'p2p.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class P2PBoostComponent {

  data = {
    points: 500
  }

  @Input('entity') entity;

  minds = {
    cdn_url: CONFIG.cdnUrl
  }

  @ViewChild('scrollArea') scrollArea : Content;

  constructor(public client : Client, public alertCtrl: AlertController, private loadingCtrl : LoadingController, private params : NavParams,
    private viewCtrl : ViewController, private cd : ChangeDetectorRef, private storage : Storage){
    this.entity = this.params.get('entity');
  }

  destinations : Array<any> = [];

  findDestinations(q){
    if(!q.value){
      this.destinations = [];
      this.cd.markForCheck();
      this.cd.detectChanges();
      return;
    }
    this.client.get('api/v1/search/suggest', {
        q: q.value,
        //type: this.type,
        limit: 12,
        offset: ""
      })
      .then((response : any) => {
        this.destinations = response.suggestions;
        this.cd.markForCheck();
        this.cd.detectChanges();
      });
  }

  destination;

  selectDestination(destination, q){
    q.value = "";
    this.destinations = [];
    this.destination = destination;
    this.cd.markForCheck();
    this.cd.detectChanges();

    //this.scrollArea.scrollToTop();
    //Keyboard.close();
  }

  boost(){
    let loader = this.loadingCtrl.create();
    loader.present();
    this.client.post('api/v1/boost/peer/' + this.entity.guid + '/' + this.entity.owner_guid, {
        type: 'points',
        bid: this.data.points,
        destination: this.destination.guid,
        //scheduledTs: this.scheduledTs,
        //postToFacebook: this.postToFacebook,
      })
      .then((response) => {
        loader.dismiss();
        this.alertCtrl.create({
          title: 'Success!',
          subTitle: `Your offer has been sent to @${this.destination.username}. You may revoke your request by visiting the Outbox of your Boost Console`,
          buttons: ['Ok']
        })
        .present();
        this.dismiss();
      })
      .catch((e) => {
        loader.dismiss();
        this.alertCtrl.create({
          title: 'Oooopppsss...',
          subTitle: e.message || 'There was a problem',
          buttons: ['Try again']
        })
        .present();
      });
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

}
