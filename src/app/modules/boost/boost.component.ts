import { Component, OnInit, OnDestroy, Input, ChangeDetectionStrategy, ChangeDetectorRef, HostListener } from '@angular/core';
import { ModalController, NavParams, NavController, ViewController, LoadingController } from 'ionic-angular'
import { Client } from '../../common/services/api/client';
import { CacheService } from '../../common/services/cache/cache.service';
import { Storage } from '../../common/services/storage';

import { CONFIG } from '../../config';

export type BoostConsoleType = 'newsfeed' | 'content' | 'peer';
export type BoostConsoleFilter = '' | 'inbox' | 'outbox';

@Component({
  moduleId: 'module.id',
  selector: 'boost-review',
  templateUrl: 'boost.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class BoostReviewComponent {

  minds = {
    cdn_url: CONFIG.cdnUrl
  }

  inProgress : boolean = false;
  boosts : Array<any> = [];
  limit : number = 12;
  offset : string = "";
  type : BoostConsoleType = 'newsfeed';
  filter: BoostConsoleFilter = 'inbox';

  constructor(public client : Client, public modalCtrl: ModalController, private params : NavParams, private loadingCtrl : LoadingController,
    private navCtrl : NavController, private cd : ChangeDetectorRef, private storage : Storage){

  }

  ngOnInit(){
    this.loadList();
  }

  loadList(refresh : boolean = false){
    if(this.type === 'content'){
      this.filter = '';
    }
    if(refresh)
      this.offset = "";
    return this.client.get('api/v1/boost/' + this.type + '/' + this.filter, { limit: 12, offset: this.offset})
      .then((response : any) => {
        if(refresh)
          this.boosts = [];
        this.boosts = this.boosts.concat(response.boosts);
        this.offset = response['load-next'];
        return true;
      })
      .then(() => {
        this.cd.markForCheck();
        this.cd.detectChanges();
      });
  }

  changeFilters(type: BoostConsoleType){
    this.type = type;
    this.filter = 'inbox';
    this.boosts = [];
    this.loadList(true);
  }

  loadMore(loader){
    this.loadList()
      .then((success) => {
        loader.complete();
        this.cd.markForCheck();
        this.cd.detectChanges();
      });
  }

  refresh(puller){
    this.loadList()
      .then((success) => {
        puller.complete();
        this.cd.markForCheck();
        this.cd.detectChanges();
      });
  }
}
