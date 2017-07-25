import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { Client } from '../../../common/services/api/client';
import { Storage } from '../../../common/services/storage';
import { ModalController } from 'ionic-angular';
import { StripeCheckout } from '../../payments/stripe/checkout.component';
import { CONFIG } from '../../../config';


@Component({
  moduleId: 'module.id',
  selector: 'm-paywall',
  templateUrl: 'paywall.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PaywallComponent implements OnInit {

  inProgress: boolean = false;
  error: string;
  showCheckout: boolean = false;
  amount: number;
  nonce: string = "";
  showSignupModal: boolean = false;
  userGuid: string;

  @Output('entityChange') update: EventEmitter<any> = new EventEmitter;

  @Input() entity;

  minds = {
    cdn_url: CONFIG.cdnUrl,
    base: CONFIG.baseUrl,
  };

  constructor(public client: Client, public modalCtrl: ModalController, public cd: ChangeDetectorRef, public storage: Storage) {
    this.userGuid = <string>this.storage.get('user_guid');
  }

  ngOnInit() {
    //get the subscription amount
  }

  checkout() {
    /*if (!this.session.isLoggedIn()) {
      this.showSignupModal = true;
      this.detectChanges();
      return;
    }*/

    this.inProgress = true;
    this.detectChanges();

    const guid = this.entity.isRemind ? this.entity.remindGuid : this.entity.guid;

    this.client.get('api/v1/payments/plans/exclusive/' + guid)
      .then((response: any) => {
        this.inProgress = false;
        if (response.subscribed) {
          this.update.next(response.entity);
          this.detectChanges();
          return;
        }
        this.showCheckout = true;
        this.amount = response.amount;
        this.detectChanges();
      })
      .catch(e => {
        this.inProgress = false;
        this.error = "Sorry, there was an error.";
        this.detectChanges();
      });
  }

  subscribe(nonce) {
    this.showCheckout = false;
    this.inProgress = true;
    this.detectChanges();
    console.log('nonce: ' + nonce);
    this.client.post('api/v1/payments/plans/subscribe/' + this.entity.owner_guid + '/exclusive', {
      nonce: nonce
    })
      .then((response) => setTimeout(() => this.checkout(), 0))
      .catch(e => {
        this.inProgress = false;
        this.error = "Sorry, we couldn't complete the transaction.";
        this.detectChanges();
      });
  }

  inputCard() {
    let checkout = this.modalCtrl.create(StripeCheckout, {
      success: (nonce: string) => {
        this.subscribe(nonce);
      },
      error: (msg) => {
        this.showError(msg);
      }
    });
    checkout.present();
  }

  showError(e) {
    this.error = "Sorry, we couldn't complete the transaction.";
    alert(e);
  }

  ngOnDestroy() {
  }

  private detectChanges() {
    this.cd.markForCheck();
    this.cd.detectChanges();
  }

}