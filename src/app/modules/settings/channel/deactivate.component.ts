
import { ChangeDetectorRef, Component } from '@angular/core';
import { Client } from '../../../common/services/api/client';
import { LoadingController } from 'ionic-angular';
import { ActionSheetController, AlertController } from "ionic-angular";
import { CurrentUserService } from "../../../common/services/current-user.service";
import { LoginComponent } from "../../../modules/auth/login.component";

@Component({
  moduleId: 'module.id',
  selector: 'm-settings--deactivate-channel',
  templateUrl: 'deactivate.component.html'
})

export class SettingsDeactivateChannelComponent {

  subscriptions: Array<any> = [];

  constructor(private client: Client, private cd: ChangeDetectorRef, private currentUser: CurrentUserService, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {

  }

  deactivate() {
    let confirmAlert = this.alertCtrl.create({
      title: `Disable Channel`,
      message: `"Are you sure you want to disable your channel?"`, // @todo: customize for each type
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: `Yes, I'm sure`,
          handler: () => {
            this.client.delete(`api/v1/channel`)
              .then(() => {
                (<any>window.localStorage.clear());
                (<any>window.location.reload());
              })
              .catch(e => {
                alert(e.message || `There was an error`);
              });
          }
        }
      ]
    });

    confirmAlert.present();

  }

}
