import { Component, OnInit, OnDestroy, Input, ChangeDetectionStrategy, ChangeDetectorRef, HostListener } from '@angular/core';
import { ModalController, NavParams, NavController, ViewController, LoadingController } from 'ionic-angular'
import { Client } from '../../common/services/api/client';
import { CacheService } from '../../common/services/cache/cache.service';
import { Storage } from '../../common/services/storage';

import { CONFIG } from '../../config';

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

  constructor(public client : Client, public modalCtrl: ModalController, private params : NavParams, private loadingCtrl : LoadingController,
    private navCtrl : NavController, private cd : ChangeDetectorRef, private storage : Storage){

  }

  ngOnInit(){
    this.loadList();
  }

  loadList(refresh : boolean = false){
    if(refresh)
      this.offset = "";
    return this.client.get('api/v1/boost/peer/inbox', { limit: 12, offset: this.offset})
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


  accept(boost, i){
    let agreed = true;
    if(boost.bidType == 'usd' && boost.postToFacebook){
      agreed = confirm(`I accept a 5% transaction fee and agree not to delete this content from Facebook`);
    } else if(boost.bidType == 'usd'){
      agreed =  confirm(`I accept a 5% transaction fee`);
    } else if(boost.postToFacebook){
      agreed =  confirm(`I agree not to delete this content from Facebook`);
    }
    if(!agreed)
      return;
    this.boosts[i].state = 'accepted';
    this.client.put('api/v1/boost/peer/' + boost.guid)
      .catch(e => {
        this.boosts[i].state = 'created';
      });
  }

  reject(boost, i){
    this.boosts[i].state = 'rejected';
    this.client.delete('api/v1/boost/peer/' + boost.guid)
      .catch(e => {
        this.boosts[i].state = 'created';
      });
  }

}
