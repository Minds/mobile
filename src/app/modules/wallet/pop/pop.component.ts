import { Component, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef, Renderer } from "@angular/core";
import { ViewController, Config, Platform, GestureController, NavParams } from 'ionic-angular';

//import { WalletService } from './wallet.service';

@Component({
  moduleId: 'module.id',
  selector: "wallet-pop",
  host: {
    '(click)': 'dismiss()'
  },
  template: `
      <div class="m-ionic-pop">{{text}}</div>
  `,
})

export class PopComponent {

  text : string = "+1"

  constructor(
    private _viewCtrl: ViewController,
    config: Config,
    private _plt: Platform,
    private _elementRef: ElementRef,
    gestureCtrl: GestureController,
    params: NavParams,
    renderer: Renderer
  ){
    this.text = config.get('text') || '+1';
  }

  ngOnInit(){
    setTimeout(() => {
      this._viewCtrl.dismiss();
    }, 2000);
  }

  dismiss(){
    this._viewCtrl.dismiss();
  }

}
