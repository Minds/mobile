declare var ApplePay;

import { Injectable } from "@angular/core";
import { Platform, ModalController } from "ionic-angular";

import { APPLE_MERCHANT_ID, STRIPE_PUBLISHABLE_KEY, STRIPE_COUNTRY } from '../../config';

import { StripeCheckout } from "../../modules/payments/stripe/checkout.component";

export type AllowedCurrencies = 'USD' | 'BTC';

@Injectable()
export class PaymentsService {

  private _hasApplePay: boolean = false;

  constructor(private platform: Platform, private modalCtrl: ModalController) { }

  setUp() {
    if (this.platform.is('ios')) {
      this._hasApplePay = true;

      console.log('Setting up Apple Pay');
      ApplePay.setMerchantId(_ => { }, e => console.error('Apple Pay setup failed', e), APPLE_MERCHANT_ID);
    }
  }

  areSubscriptionsAllowed() {
    return true;
  }

  showCardUI() {
    return !this._hasApplePay;
  }

  checkout(amount: number, currency: AllowedCurrencies, description: string = 'Minds'): Promise<any> {
    if (this._hasApplePay) {
      return this._checkoutApplePay(amount, description, currency);
    } else {
      return this._checkoutMinds();
    }
  }

  // Payment methods

  _checkoutApplePay(amount: number, description: string, currency: AllowedCurrencies): Promise<any> {
    const stringAmount = `${amount}`;

    return new Promise((resolve, reject) => {
      ApplePay.getStripeToken(token => {
        resolve(token.id);
      }, function (err) {
        reject(new Error(err));
      }, [ STRIPE_PUBLISHABLE_KEY, stringAmount, description, currency, STRIPE_COUNTRY ]);
    });
  }

  _checkoutMinds(): Promise<any> {
    return new Promise((resolve, reject) => {
      const checkout = this.modalCtrl.create(StripeCheckout, {
        success: (nonce: string) => {
          resolve(nonce);
        },
        error: (msg) => {
          reject(new Error(msg));
        }
      });

      checkout.present();
    });
  }
}
