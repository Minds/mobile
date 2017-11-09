import { Component, OnInit, OnDestroy, Input, ChangeDetectionStrategy, ChangeDetectorRef, HostListener } from '@angular/core';
import { ModalController, NavParams, NavController, ViewController, LoadingController, Platform } from 'ionic-angular'
import { Client } from '../../common/services/api/client';
import { CacheService } from '../../common/services/cache/cache.service';
import { Storage } from '../../common/services/storage';

import { WalletService } from './wallet.service';
import { PurchaseComponent } from './purchase.component';

import { CONFIG } from '../../config';

@Component({
  moduleId: 'module.id',
  selector: 'wallet-history',
  templateUrl: 'history.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class WalletHistoryComponent {

  minds = {
    cdn_url: CONFIG.cdnUrl
  }

  components : {
    purchase : PurchaseComponent
  }

  inProgress : boolean = false;
  transactions : Array<any> = [];
  limit : number = 12;
  offset : string = "";
  subscription;
  points : number = 0;

  constructor(
    public client: Client,
    public modalCtrl: ModalController,
    private params: NavParams,
    private viewCtrl: ViewController,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private cd: ChangeDetectorRef,
    private storage: Storage,
    private service: WalletService,
    public platform: Platform
  ){

  }

  ngOnInit(){
    this.load();
  }

  load(){
    return this.client.get('api/v1/wallet/transactions', { limit: 12, offset: this.offset})
      .then((response : any) => {
        this.transactions = this.transactions.concat(response.transactions);
        this.offset = response['load-next'];
        return true;
      })
      .then(() => {
        this.cd.markForCheck();
        this.cd.detectChanges();
      });
  }

  loadMore(loader){
    this.load()
      .then((success) => {
        loader.complete();
        this.cd.markForCheck();
        this.cd.detectChanges();
      });
  }

  refresh(puller){
    this.offset = "";
    this.transactions = [];
    this.load()
      .then((success) => {
        puller.complete();
        this.cd.markForCheck();
        this.cd.detectChanges();
      });
  }

}
