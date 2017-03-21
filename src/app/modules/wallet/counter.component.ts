import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, OnDestroy } from "@angular/core";
import { ModalController, NavController } from 'ionic-angular';
import { Subscription } from "rxjs/Subscription";

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

export class WalletCounterComponent implements OnInit, OnDestroy {
  points: number;

  private subscription: Subscription;

  constructor(public service : WalletService, private cd : ChangeDetectorRef, private modalCtrl : ModalController,
    private navCtrl : NavController){
  }

  ngOnInit() {
    this.subscription = this.service.getCount(true)
      .subscribe((count: number) => {
          this.points = count;
          this.cd.markForCheck();
          this.cd.detectChanges();
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  open(e){
    this.navCtrl.push(WalletComponent);
    //this.modalCtrl.create(WalletComponent)
    //  .present();
  }

}
