import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { ActionSheetController, AlertController } from "ionic-angular";

import { Client } from "../../../common/services/api/client";
import { CONFIG } from "../../../config";

@Component({
  moduleId: 'module.id',
  selector: 'm-payments--plans',
  templateUrl: 'plan.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlanConsoleComponent implements OnInit {
  type: string = 'exclusive';

  subscriptions: any[] = [];

  minds = {
    cdn_url: CONFIG.cdnUrl
  }

  inProgress: boolean = false;
  moreData: boolean = true;
  offset: string = '';

  constructor(private actionSheetCtrl: ActionSheetController, private alertCtrl: AlertController, public client: Client, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.load(true);
  }

  load(refresh?: boolean): Promise<any> {
    if (this.inProgress && !refresh) {
      return Promise.resolve(true);
    }

    if (refresh) {
      this.moreData = true;
      this.offset = '';
      this.subscriptions = [];
    }

    this.inProgress = true;

    this.detectChanges();

    return this.client.get(`api/v1/payments/subscriptions/${this.type}`)
      .then(({ subscriptions, 'load-next': loadNext }) => {
        if (subscriptions && subscriptions.length) {
          this.subscriptions.push(...subscriptions);
        } else {
          this.moreData = false;
        }

        if (loadNext) {
          this.offset = loadNext;
        } else {
          this.moreData = false;
        }

        this.detectChanges();
      })
      .catch(e => {
        this.moreData = false;

        this.detectChanges();

        throw e;
      });
  }

  refresh($event) {
    this.load(true)
      .then(() => {
        $event.complete();
        this.detectChanges();
      });
  }

  loadMore($event) {
    if (!this.moreData) {
      $event.complete();
      this.detectChanges();
      return;
    }

    this.load()
      .then(() => {
        $event.complete();
        this.detectChanges();
      });
  }

  actions(subscription, index) {
    let actionSheet = this.actionSheetCtrl.create({
      title: subscription.name,
      buttons: [
        {
          text: 'Cancel plan',
          role: 'destructive',
          handler: () => {
            this.cancel(subscription, index);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });

    actionSheet.present();
  }

  cancel(subscription, index) {
    let confirmAlert = this.alertCtrl.create({
      title: `Cancel subscription to ${subscription.name}`,
      message: `You won't be able to see their exclusive content.`, // @todo: customize for each type
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: `Yes, I'm sure`,
          handler: () => {
            this.client.delete(`api/v1/payments/plans/${this.type}/${subscription.guid}`)
              .then(() => { })
              .catch(e => {
                alert(e.message || `There was an error canceling this plan`);
              });

            this.subscriptions.splice(index, 1);

            this.detectChanges();
          }
        }
      ]
    });

    confirmAlert.present();
  }

  detectChanges(){
    this.cd.markForCheck();
    this.cd.detectChanges();
  }
}
