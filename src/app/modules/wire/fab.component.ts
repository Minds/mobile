import { Component, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef, Renderer } from "@angular/core";
import { ViewController, Config, Platform, GestureController, NavParams } from 'ionic-angular';

//import { WalletService } from './wallet.service';

@Component({
  moduleId: 'module.id',
  selector: "wire-fab",
  template: `
    <ion-icon name="md-close" class="m-ionic-wire--close" (click)="dismiss()"></ion-icon>
    <div class="m-ionic-wire--fab">

      <div class="m-ionic-wire--fab-bolt m-ionic-wire--fab-button">
        <ion-icon name="ios-flash" class="m-ionic-icon"></ion-icon>
      </div>

      <div class="m-ionic-wire--fab-input">
        <input type="number" [(ngModel)]="amount" />
      </div>

      <div class="m-ionic-wire--fab-options">
        <div class="m-ionic-wire--fab-options-option" (click)="selectMethod('points')">
          <ion-icon name="md-trophy" class="m-ionic-icon"></ion-icon>
          Points
        </div>
        <div class="m-ionic-wire--fab-options-option" (click)="selectMethod('money')">
          <ion-icon name="logo-usd" class="m-ionic-icon"></ion-icon>
          Money
        </div>
        <div class="m-ionic-wire--fab-options-option" (click)="selectMethod('bitcoin')">
          <ion-icon name="logo-bitcoin" class="m-ionic-icon"></ion-icon>
          Bitcoin
        </div>
      </div>

    </div>
  `,
})

export class WireFabComponent {

  text : string = "this is a wire fab"
  amount : number = 1000;
  method : string = "points";

  constructor(
    private _viewCtrl: ViewController,
    config: Config,
    private _plt: Platform,
    private _elementRef: ElementRef,
    gestureCtrl: GestureController,
    params: NavParams,
    renderer: Renderer
  ){
    this.text = params.get('text') || '+1';
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
  }

  round(number, precision) {
    var factor = Math.pow(10, precision);
    var tempNumber = number * factor;
    var roundedTempNumber = Math.round(tempNumber);
    return roundedTempNumber / factor;
  }


  dismiss(){
    this._viewCtrl.dismiss();
  }

}
