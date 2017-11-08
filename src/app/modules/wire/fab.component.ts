import { Component, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef, Renderer } from "@angular/core";
import { ViewController, Config, Platform, GestureController, NavParams, AlertController } from 'ionic-angular';
import { Client } from "../../common/services/api/client";

import { WireService } from './wire.service';

@Component({
  moduleId: 'module.id',
  selector: "wire-fab",
  templateUrl: 'fab.component.html'
})

export class WireFabComponent {

  guid : string;
  amount : number = 1000;
  method : string = "points";
  payload: any;
  recurring: boolean = false;

  animate : boolean = false;
  inProgress : boolean = false;

  owner: any = {};
  sums: any;
  default: any;

  constructor(
    private _viewCtrl: ViewController,
    config: Config,
    private _plt: Platform,
    private _elementRef: ElementRef,
    gestureCtrl: GestureController,
    params: NavParams,
    renderer: Renderer,
    public service : WireService,
    private cd : ChangeDetectorRef,
    private alertCtrl : AlertController,
    private client: Client,
    public platform: Platform
  ){
    this.guid = params.get('guid');

    if (params.get('default')) {
      this.default = params.get('default');
      this.setDefaults();
    }
  }

  ngOnInit(){
    //setTimeout(() => {
    //  this._viewCtrl.dismiss();
    //}, 2000);
    this.syncOwner();
  }

  selectMethod(method : string){
    //selected money from points
    if(this.method == 'points' && method == 'money')
      this.amount = this.amount / 500;

    if(this.method == 'points' && method == 'bitcoin')
      this.amount = (this.amount / 500) / 1024;

    if(this.method == 'money' && method == 'points')
      this.amount = this.amount * 500;

    if(this.method == 'money' && method == 'bitcoin')
      this.amount = this.amount / 1024; //hook to the live bitcoin rate

    if(this.method == 'bitcoin' && method == 'money')
      this.amount = this.round(this.amount * 1024, 6); //hook to the live bitcoin rate

    if(this.method == 'bitcoin' && method == 'points')
      this.amount = (this.amount * 1024) * 500;

    this.method = method;
    this.cd.markForCheck();
    this.cd.detectChanges();

  }

  setPayload(payload: any) {
    this.payload = payload;

    this.cd.markForCheck();
    this.cd.detectChanges();
  }

  round(number, precision) {
    const factor = Math.pow(10, precision);
    const tempNumber = number * factor;
    const roundedTempNumber = Math.round(tempNumber);
    return roundedTempNumber / factor;
  }

  send(){
    if(this.inProgress)
      return;
    this.inProgress = true;



    if(this.method == 'bitcoin'){
      let alert = this.alertCtrl.create({
        title: `We're working on it!`,
        subTitle: "Bitcoin is coming soon.",
        buttons: ['Ok']
      });
      alert.present();
      this.inProgress = false;
      return false;
    }

    let confirm = this.alertCtrl.create({
      title: 'Are you sure?',
      //subTitle: "",
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            this.inProgress = false;
            this.cd.markForCheck();
            this.cd.detectChanges();
          }
        },
        {
          text: 'Send',
          handler: () => {
            this.service.setEntityGuid(this.guid);
            this.service.setMethod(this.method);
            this.service.setAmount(this.amount);
            this.service.setRecurring(this.recurring);
            this.service.setPayload(this.payload);

            this.animate = true;
            this.cd.markForCheck();
            this.cd.detectChanges();

            this.service.send()
              .then(() => {
                //console.log('[wire]: success');
                setTimeout(() => {
                  this.dismiss();
                }, 1000);
              })
              .catch(e => {
                this.inProgress = false;
                this.animate = false;
                this.cd.markForCheck();
                this.cd.detectChanges();

                if (!e || e.message != 'user cancelled apple pay') {
                  let alert = this.alertCtrl.create({
                    title: 'There was a problem processing payment',
                    subTitle: (e && e.message) || 'Unknown internal error',
                    buttons: ['Ok']
                  });
                  alert.present();
                }

              });
          }
        }]
    });
    confirm.present();
  }

  dismiss(){
    this._viewCtrl.dismiss();
  }

  syncOwner() {
    if (!this.guid) {
      return;
    }

    this.client.get(`api/v1/wire/rewards/${this.guid}/entity`)
      .then(({ username, merchant, wire_rewards, sums }) => {
        this.owner.username = username;
        this.owner.merchant = merchant;
        this.owner.wire_rewards = wire_rewards;
        this.sums = sums;

        this.setDefaults();

        this.cd.markForCheck();
        this.cd.detectChanges();
      });
  }

  setDefaults() {
    if (this.default) {
      this.method = this.default.type;
      this.amount = this.default.min;

      if (this.sums && this.sums[this.default.type]) {
        this.amount = <number>this.amount - Math.ceil(this.sums[this.default.type]);
      }
    } else if (this.owner.merchant) {
      this.method = 'money';
      this.amount = 1;
    }

    if (this.amount < 0) {
      this.amount = 0;
    }
  }

  canWire() {
    let valid = this.method && (this.amount > 0);

    if (this.method == 'money') {
      valid = valid && (this.payload || !this.service.showCardUI());
    }

    return valid;
  }

}
