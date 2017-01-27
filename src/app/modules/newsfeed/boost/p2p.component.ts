import { Component, OnInit, OnDestroy, Input, ChangeDetectionStrategy, ChangeDetectorRef, HostListener } from '@angular/core';
import { ModalController, NavParams, ViewController } from 'ionic-angular'
import { CacheService } from '../../../common/services/cache/cache.service';
import { Storage } from '../../../common/services/storage';
import { Client } from '../../../common/services/api/client';


@Component({
  moduleId: 'module.id',
  selector: 'p2p-boost',
  templateUrl: 'p2p.component.html',
  //styleUrls: ['activity.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
  ////styleUrls: ['activity.component.css']
})

export class P2PBoostComponent {

  @Input('entity') entity;

  minds = {
    cdn_url: 'https://edge.minds.com/'
  }

  constructor(public client : Client, public modalCtrl: ModalController, private params : NavParams,
    private viewCtrl : ViewController, private cd : ChangeDetectorRef, private storage : Storage){

  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

}
