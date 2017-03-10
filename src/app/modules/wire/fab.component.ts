import { Component, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef, Renderer } from "@angular/core";
import { ViewController, Config, Platform, GestureController, NavParams } from 'ionic-angular';

import { WireService } from './wire.service';

@Component({
  moduleId: 'module.id',
  selector: "wire-fab",
  template: `
    <ion-icon name="md-close" class="m-ionic-wire--close" (click)="dismiss()"></ion-icon>
    <div class="m-ionic-wire--fab">

      <div class="m-ionic-wire--fab-bolt m-ionic-wire--fab-button"
       [class.m-ionic-wire--fab-bolt-animate]="animate">
        <ion-icon name="ios-flash" class="m-ionic-icon"></ion-icon>
      </div>

      <div class="m-ionic-wire--fab-input">
        <input type="number" [(ngModel)]="amount" />
      </div>

      <div class="m-ionic-wire--fab-options">
        <div class="m-ionic-wire--fab-options-option"
          [class.m-ionic-wire--fab-options-option-selected]="method == 'points'"
          (click)="selectMethod('points')">
          <ion-icon name="md-trophy" class="m-ionic-icon"></ion-icon>
          Points
        </div>
        <div class="m-ionic-wire--fab-options-option"
          [class.m-ionic-wire--fab-options-option-selected]="method == 'money'"
          (click)="selectMethod('money')">
          <ion-icon name="logo-usd" class="m-ionic-icon"></ion-icon>
          Money
        </div>
        <div class="m-ionic-wire--fab-options-option"
          [class.m-ionic-wire--fab-options-option-selected]="method == 'bitcoin'"
          (click)="selectMethod('bitcoin')">
          <ion-icon name="logo-bitcoin" class="m-ionic-icon"></ion-icon>
          Bitcoin
        </div>
      </div>

      <button ion-button clear class="m-ionic-wire--fab-send" (click)="send()" *ngIf="!inProgress">Send</button>

    </div>
  `,
})

export class WireFabComponent {

  guid : string;
  amount : number = 1000;
  method : string = "points";

  animate : boolean = false;
  inProgress : boolean = false;

  constructor(
    private _viewCtrl: ViewController,
    config: Config,
    private _plt: Platform,
    private _elementRef: ElementRef,
    gestureCtrl: GestureController,
    params: NavParams,
    renderer: Renderer,
    private service : WireService,
    private cd : ChangeDetectorRef
  ){
    this.guid = params.get('guid');
  }

  ngOnInit(){
    //setTimeout(() => {
    //  this._viewCtrl.dismiss();
    //}, 2000);
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

  round(number, precision) {
    var factor = Math.pow(10, precision);
    var tempNumber = number * factor;
    var roundedTempNumber = Math.round(tempNumber);
    return roundedTempNumber / factor;
  }

  send(){
    if(this.inProgress)
      return;
    this.inProgress = true;

    this.service.setEntityGuid(this.guid);
    this.service.setMethod(this.method);
    this.service.setAmount(this.amount);

    this.animate = true;
    this.cd.markForCheck();
    this.cd.detectChanges();

    this.service.send()
      .then(() => {
        console.log('[wire]: success');
        setTimeout(() => {
          this.dismiss();
        }, 1000);
      })
      .catch(() => {
        console.log('[wire]: exception thrown');
        this.inProgress = false;
      });
  }


  dismiss(){
    this._viewCtrl.dismiss();
  }

}
