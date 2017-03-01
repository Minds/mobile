import { Component, OnInit, OnDestroy, Input, ChangeDetectionStrategy, ChangeDetectorRef, HostListener } from '@angular/core';
import { ModalController, NavParams, ViewController, LoadingController } from 'ionic-angular'
import { CacheService } from '../../../common/services/cache/cache.service';
import { Storage } from '../../../common/services/storage';
import { Client } from '../../../common/services/api/client';


@Component({
  moduleId: 'module.id',
  selector: 'newsfeed-boost',
  templateUrl: 'newsfeed.component.html',
  //styleUrls: ['activity.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
  ////styleUrls: ['activity.component.css']
})

export class NewsfeedBoostComponent {

  @Input('entity') entity;

  minds = {
    cdn_url: 'https://edge.minds.com/'
  }

  data = {
    points: 100,
    impressions: 100
  }

  rate : any = {
    balance: 0,
    rate: 1,
    min: 10,
    cap: 5000
  }

  loader;
  inProgress : boolean = false;

  constructor(public client : Client, public modalCtrl: ModalController, private params : NavParams,
    private viewCtrl : ViewController, private loadingCtrl : LoadingController, private cd : ChangeDetectorRef,
    private storage : Storage){

    this.loader = this.loadingCtrl.create({
      //content: "Please wait...",
    });
  }

  ngOnInit(){
    this.entity = this.params.get('entity');
    //get the rates and balance
    this.client.get('api/v1/boost/rates', { cb: Date.now() })
      .then((success : any) => {
        this.rate = success;
      });
  }

  showError(message : string){
    alert(message);
  }

  boost() {

    //if(this.inProgress)
    //  return;

    this.inProgress = true;
    this.loader.present();

    if (this.data.points % 1 !== 0) {
      this.data.points = Math.round(this.data.points);
      this.showError('Sorry, you must enter a whole point.');
      this.inProgress = false;
      this.loader.dismiss();
      return false;
    }

    if (this.data.points === 0 || !this.data.points) {
      this.data.points = 1;
      this.showError('Sorry, you must enter a whole point.');
      this.inProgress = false;
      this.loader.dismiss();
      return false;
    }

    if (this.data.impressions === 0 || Math.round(this.data.impressions) === 0) {
      this.showError('Sorry, you must have at least 1 impression.');
      this.inProgress = false;
      this.loader.dismiss();
      return false;
    }

    if (!this.checkBalance()){
      this.inProgress = false;
      this.loader.dismiss();
      return false;
    }

    //commence the boost
    this.client.post('api/v1/boost/' + this.entity.type + '/' + this.entity.guid + '/' + this.entity.owner_guid,
      {
        impressions: this.data.impressions,
        destination: 'Newsfeed'
      })
      .then((success : any) => {
        this.inProgress = false;
        this.loader.dismiss();
        this.dismiss();
      })
      .catch((e) => {
        this.showError((e && e.message) || 'Sorry, something went wrong.');
        this.inProgress = false;
        this.loader.dismiss();
      });

  }

  checkBalance(){
    if (this.rate.balance < this.data.points) {
      this.showError('Ooops! You only have ' + this.rate.balance + ' points');
      this.data.points = this.rate.balance;
      this.calculateImpressions();
      return false;
    }

    //over the cap?
    if (this.data.points > this.rate.cap) {
      this.showError('Ooops! Sorry, you can only spend ' + this.rate.cap + ' points');
      this.data.points = this.rate.cap;
      this.calculateImpressions();
      return false;
    }

    //under the min?
    if (this.data.points < this.rate.min) {
      this.showError('Ooops! Sorry, you need to enter at least ' + this.rate.min + ' points');
      this.data.points = this.rate.min;
      this.calculateImpressions();
      return false;
    }
    //check if the user has enough points
    if (this.rate.balance >= this.data.points){
      return true;
    }

    return false;
  }


  calculateImpressions(){
    this.data.impressions = Math.round(this.data.points * this.rate.rate);
  }

  calculatePoints(){
    this.data.points = Math.round(this.data.impressions / this.rate.rate);
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

}
