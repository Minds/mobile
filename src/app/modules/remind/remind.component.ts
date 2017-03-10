import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NavParams, ViewController } from "ionic-angular";

import { Client } from '../../common/services/api/client';
import { Storage } from '../../common/services/storage';

import { CONFIG } from "../../config";

@Component({
  moduleId: 'module.id',
  selector: 'remind',
  templateUrl: 'remind.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RemindComponent {
  message: string = '';
  entity;

  inProgress: boolean = false;

  minds = {
    cdn_url: CONFIG.cdnUrl
  }

  constructor(private params: NavParams, public storage: Storage, private client: Client, private viewCtrl: ViewController) {
    this.entity = this.params.get('entity');
  }

  post() {
    if (this.inProgress) {
      return;
    }

    const message = this.message;

    this.inProgress = true;

    this.client.post(`api/v1/newsfeed/remind/${this.entity.guid}`, { message })
      .then(() => {
        this.viewCtrl.dismiss({ success: true });
      })
      .catch(e => { });
  }

  dismiss() {
    if (this.inProgress) {
      return;
    }

    this.viewCtrl.dismiss();
  }
}
