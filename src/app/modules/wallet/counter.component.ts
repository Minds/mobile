import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from "@angular/core";

import { WalletService } from './wallet.service';

@Component({
  moduleId: 'module.id',
  selector: "wallet-counter",
  templateUrl: "counter.component.html",
  //styleUrls: [ 'tabs.component.css' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class WalletCounterComponent {

  subscription;
  points : number;

  constructor(public service : WalletService, private cd : ChangeDetectorRef){
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

}
