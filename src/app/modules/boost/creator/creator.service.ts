import { Injectable } from '@angular/core';
import { ModalController } from 'ionic-angular';

import { Client } from '../../../common/services/api/client';
import { BoostStruc, VisibleBoostError } from './types';
import { StripeCheckout } from '../../payments/stripe/checkout.component';

@Injectable()
export class BoostCreatorService {

  constructor(private client: Client, private modalCtrl: ModalController) {
  }

  send(boost: BoostStruc, entity: any) {
    return this.getTransactionPayloads(boost)
      .then((payload: any) => {
        boost.nonce = payload.nonce;

        let request: Promise<any>;

        if (boost.type !== 'p2p') {
          request = this.client.post(`api/v1/boost/${entity.type}/${entity.guid}/${entity.owner_guid}`, {
            bidType: boost.currency,
            impressions: boost.amount,
            categories: boost.categories,
            priority: boost.priority ? 1 : null,
            paymentMethod: boost.nonce
          })
            .then(response => {
              return { done: true };
            });
        }
        else {
          request = this.client.post(`api/v1/boost/peer/${entity.guid}/${entity.owner_guid}`, {
            type: boost.currency == 'points' ? 'points' : 'pro', // TODO: BTC
            bid: boost.amount,
            destination: boost.target.guid,
            scheduledTs: boost.scheduledTs,
            postToFacebook: boost.postToFacebook ? 1 : null,
            nonce: boost.nonce
          })
            .then(response => {
              return { done: true };
            })
            .catch(e => {
              if (e && e.stage == 'transaction') {
                throw new VisibleBoostError('Sorry, your payment failed. Please, try again or use another card');
              }
            });
        }
        return request;
      });


  }

  getTransactionPayloads(boost: BoostStruc): Promise<string> {
    return new Promise((resolve, reject) => {
      switch (boost.currency) {
        case 'usd':
          const checkout = this.modalCtrl.create(StripeCheckout, {
            success: (nonce: string) => {
              resolve({ nonce: nonce });
            },
            error: (msg) => {
              reject(msg);
            }
          });
          checkout.present();
          break;
        case 'btc':
          break;
        case 'points':
          resolve({});
          break;
      }
    });
  }
}
