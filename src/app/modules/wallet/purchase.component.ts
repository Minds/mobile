import { Component, OnInit, OnDestroy, Input, ChangeDetectionStrategy, ChangeDetectorRef, HostListener } from '@angular/core';
import { ModalController, NavParams, ViewController, LoadingController } from 'ionic-angular'
import { Client } from '../../common/services/api/client';
import { CacheService } from '../../common/services/cache/cache.service';
import { Storage } from '../../common/services/storage';

import { WalletService } from './wallet.service';


@Component({
  moduleId: 'module.id',
  selector: 'purchase-points',
  templateUrl: 'purchase.component.html',
  //styleUrls: ['activity.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
  ////styleUrls: ['activity.component.css']
})

export class PurchaseComponent {

  minds = {
    cdn_url: 'https://edge.minds.com/'
  }

  inProgress : boolean = false;

  subscription;
  points : number = 0;

  constructor(public client : Client, public modalCtrl: ModalController, private params : NavParams,
    private viewCtrl : ViewController, private loadingCtrl : LoadingController, private cd : ChangeDetectorRef,
    private storage : Storage, private service : WalletService){

  }

}
