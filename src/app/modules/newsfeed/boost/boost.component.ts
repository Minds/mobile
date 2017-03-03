import { Component, OnInit, OnDestroy, Input, ChangeDetectionStrategy, ChangeDetectorRef, HostListener } from '@angular/core';
import { ModalController, NavParams, ViewController } from 'ionic-angular'
import { CacheService } from '../../../common/services/cache/cache.service';
import { Storage } from '../../../common/services/storage';
import { Client } from '../../../common/services/api/client';

import { NewsfeedBoostComponent } from './newsfeed.component';
import { P2PBoostComponent } from './p2p.component';

import { CONFIG } from '../../../config';

@Component({
  moduleId: 'module.id',
  selector: 'boost',
  templateUrl: 'boost.component.html',
  //styleUrls: ['activity.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
  ////styleUrls: ['activity.component.css']
})

export class BoostComponent {

  @Input('entity') entity;

  minds = {
    cdn_url: CONFIG.cdnUrl
  }

  constructor(public cache : CacheService, public modalCtrl: ModalController, private params : NavParams,
    private viewCtrl : ViewController, private cd : ChangeDetectorRef, private storage : Storage){

  }

  ngOnInit(){
    this.entity = this.params.get('entity');
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

  openNewsfeedBoost(){
    this.modalCtrl.create(NewsfeedBoostComponent, { entity: this.entity })
      .present();
    this.dismiss();
  }

  openP2PBoost(){
    this.modalCtrl.create(P2PBoostComponent, { entity: this.entity })
      .present();
    this.dismiss();
  }

}
