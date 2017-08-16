import { ChangeDetectorRef, Component } from '@angular/core';
import { Client } from '../../../../common/services/api/client';
import { LoadingController } from 'ionic-angular';

@Component({
  moduleId: 'module.id',
  selector: 'm-settings--billing-subscriptions',
  templateUrl: 'subscriptions.component.html'
})

export class SettingsBillingSubscriptionsComponent {

  subscriptions: Array<any> = [];

  constructor(private client: Client, private cd: ChangeDetectorRef, private loadingCtrl: LoadingController) {

  }

  ngOnInit() {
    this.loadList();
  }

  loadList(): Promise<any> {
    let loader = this.loadingCtrl.create();
    loader.present();
    this.subscriptions = [];
    this.detectChanges();

    return this.client.get(`api/v1/payments/subscriptions`)
      .then(({ subscriptions }) => {
        loader.dismiss();

        if (subscriptions && subscriptions.length) {
          this.subscriptions = subscriptions;
          this.detectChanges();
        }
      })
      .catch(e => {
        loader.dismiss();
        this.detectChanges();
      });
  }

  cancel(i: number) {
    let loader = this.loadingCtrl.create();
    loader.present();
    this.detectChanges();

    let subscription = this.subscriptions[ i ];
    this.client.delete(`api/v1/payments/subscriptions/${subscription.id}`)
      .then(() => {
        this.subscriptions.splice(i, 0);

        loader.dismiss();
        this.detectChanges();
      })
      .catch(e => {
        alert("Sorry, there was an error");
        loader.dismiss();
        this.detectChanges();
      });
  }

  detectChanges(): void {
    this.cd.markForCheck();
    this.cd.detectChanges();
  }

}
