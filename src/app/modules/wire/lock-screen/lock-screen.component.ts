import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Platform } from 'ionic-angular';

import { Storage } from '../../../common/services/storage';
import { Client } from "../../../common/services/api/client";
import { WireFabController } from "../fab";
import { CONFIG } from "../../../config";

@Component({
  moduleId: 'module.id',
  selector: 'm-wire-lock-screen',
  templateUrl: 'lock-screen.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WireLockScreenComponent {
  @Input('entity') entity: any;
  @Output('entityChange') entityChangeEmitter: EventEmitter<any> = new EventEmitter<any>();

  inProgress: boolean = false;

  minds = {
    cdn_url: CONFIG.cdnUrl
  }

  constructor(
    private storage: Storage,
    private client: Client,
    private cd: ChangeDetectorRef,
    private fab: WireFabController,
    private platform: Platform
  ) { }

  unlock(skipWireModal: boolean = false) {
    this.inProgress = true;
    this.detectChanges();

    this.client.get('api/v1/wire/threshold/' + this.entity.guid)
      .then((response: any) => {
        if (response.activity) {
          this.entityChangeEmitter.emit(response.activity);
        } else if (response.entity) {
          this.entityChangeEmitter.emit(response.entity);
        } else if (!skipWireModal) {
          this.showWire();
        }

        this.inProgress = false;
        this.detectChanges();
      })
      .catch(e => {
        this.inProgress = false;
        this.detectChanges();
      });
  }

  showWire() {
    if (this.platform.is('ios') && this.entity.wire_threshold.type == 'money') {
      alert("Sorry, we can't accept payments on iOS");
      return;
    }

    let fab = this.fab.create({
      guid: this.entity.guid,
      default: this.entity && this.entity.wire_threshold
    });

    fab.onDidDismiss(() => {
      this.unlock(true);
    });

    fab.present();
  }

  getBackground() {
    if (!this.entity) {
      return;
    }

    if (this.entity._preview) {
      return `url(${this.entity.ownerObj.merchant.exclusive._backgroundPreview})`;
    }

    if (!this.entity.ownerObj || !this.entity.ownerObj.merchant || !this.entity.ownerObj.merchant.exclusive || !this.entity.ownerObj.merchant.exclusive.background) {
      return null;
    }

    let image = this.minds.cdn_url + 'fs/v1/paywall/preview/' + this.entity.ownerObj.guid + '/' + this.entity.ownerObj.merchant.exclusive.background;

    return `url(${image})`;
  }

  isOwner() {
    return this.storage.get('user_guid') == this.entity.owner_guid;
  }

  detectChanges() {
    this.cd.markForCheck();
    this.cd.detectChanges();
  }
}
