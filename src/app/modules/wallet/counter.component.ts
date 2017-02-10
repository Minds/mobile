import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from "@angular/core";
import { ModalController, NavController } from 'ionic-angular';

import { WalletComponent } from './wallet.component';
import { WalletService } from './wallet.service';

@Component({
  moduleId: 'module.id',
  selector: "wallet-counter",
  templateUrl: "counter.component.html",
  host: {
    '(click)': 'open()'
  },
  //styleUrls: [ 'tabs.component.css' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class WalletCounterComponent {

  subscription;
  points : number;

  constructor(public service : WalletService, private cd : ChangeDetectorRef, private modalCtrl : ModalController,
    private navCtrl : NavController){
  }

  ngOnInit(){
    let subscription = this.service.getCount()
      .subscribe(
        (count : number) => {
          this.points = count;
          this.cd.markForCheck();
          this.cd.detectChanges();
        });
  }

  open(e){
    this.navCtrl.push(WalletComponent);
    //this.modalCtrl.create(WalletComponent)
    //  .present();
  }

}
