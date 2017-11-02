import { ChangeDetectorRef, Component, EventEmitter, Input } from '@angular/core';
import { Platform } from 'ionic-angular';

import { WalletService } from '../../services/wallet';
import { Client } from '../../../common/services/api/client';
import { WireService } from '../wire.service';


interface CreditCard {
  number?: number,
  type?: string,
  name?: string,
  sec?: number,
  month?: number | string,
  year?: number | string
}

@Component({
  moduleId: 'module.id',
  selector: 'minds-card-selector',
  outputs: [ 'inputed', 'done' ],
  template: `
    <div class="m-error mdl-color--red mdl-color-text--white" *ngIf="error">
      {{error}}
    </div>

    <div class="m-payments-options mdl-card" style="margin-bottom:8px" *ngIf="useBitcoin"
    >
      <div id="coinbase-btn" *ngIf="useBitcoin"></div>
    </div>

    <div [hidden]="!loading" class="m-checkout-loading">
      <!--<div class="mdl-spinner mdl-spinner&#45;&#45;single-color mdl-js-spinner is-active" style="margin:auto; display:block;"
        [mdl]></div>-->
      <p>One moment please...</p>
    </div>

    <div class="m-payments--saved-cards" *ngIf="!loading && platform.is('ios')">
      <div class="m-payments-saved--title">Select a card to use</div>
      <ul>
        <li *ngFor="let card of cards"
          class="m-payments--saved-card-item"
          (click)="setCard(card.id)"
        >
          <span class="m-payments--saved-card-item-type">{{card.brand}}</span>
          <span class="m-payments--saved-card-item-number">**** {{card.last4}}</span>
          <span class="m-payments--saved-card-item-expiry">{{card.exp_month}} / {{card.exp_year}}</span>
          <span class="m-payments--saved-card-item-select">Select</span>
        </li>
        <li class="m-payments--saved-card-item m-payments-saved--item-new" (click)="useNewCard()">
          <span class="m-payments--saved-card-item-type">Use a new card</span>
          <span class="m-payments--saved-card-item-select">Select</span>
        </li>
      </ul>
    </div>

    <!--<minds-checkout-card-input (confirm)="setCard($event)" [hidden]="inProgress || confirmation || loading"
      [useMDLStyling]="useMDLStyling" *ngIf="useCreditCard && !cards.length"></minds-checkout-card-input>-->
    <div [hidden]="!inProgress" class="m-checkout-loading">
      <div class="mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active" style="margin:auto; display:block;">
      </div>
      <p>Capturing card details...</p>
    </div>
  `
})

export class CardSelectorComponent {

  loading: boolean = false;
  inProgress: boolean = false;
  confirmation: boolean = false;
  error: string = "";
  card;

  inputed: EventEmitter<any> = new EventEmitter;
  done: EventEmitter<any> = new EventEmitter;

  @Input() amount: number = 0;
  @Input() merchant_guid;
  @Input() gateway: string = "merchants";

  @Input('useMDLStyling') useMDLStyling: boolean = true;

  stripe;
  bt_checkout;
  nonce: string = "";

  cards: any[] = [];

  @Input() useCreditCard: boolean = true;
  @Input() useBitcoin: boolean = false;
  token: string = '';

  constructor(public client: Client, private service: WireService, private cd: ChangeDetectorRef, public platform: Platform) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.setupStripe();
    }, 1000); //sometimes stripe can take a while to download

    this.loadSavedCards();
  }

  setupStripe() {
    return new Promise<any>((resolve, reject) => {
      this.client.get('api/v1/payments/stripe/token/default')
        .then((response: any) => {
          this.token = response.token;

          if ((<any>window).Stripe) {
            (<any>window).Stripe.setPublishableKey(this.token);
            resolve();
          }

        })
        .catch(error => {
          reject(error);
        });
    });

  }

  loadSavedCards() {
    this.loading = true;
    this.cards = [];

    return this.client.get(`api/v1/payments/stripe/cards`)
      .then(({ cards }) => {
        this.loading = false;

        if (cards && cards.length) {
          /*this.cards = (<any[]>cards).map(card => ({
            id: card.id,
            label: `${card.brand} ${card.exp_month}/${('' + card.exp_year).substr(2)} **** ${card.last4}`
          }));*/
          this.cards = cards;
        } else {
          this.card = [];
        }
        this.detectChanges();
      })
      .catch(e => {
        this.loading = false;
        this.detectChanges();
      });
  }

  setCard(nonce) {
    console.warn('setCard ', nonce);
    this.nonce = nonce;
    this.detectChanges();
    this.inputed.next(this.nonce);
  }

  useNewCard() {
    this.inProgress = true;
    this.cards = [];
    this.service.setMethod('money');
    this.service.getTransactionPayloads()
      .then((payload: any) => {
        this.setCard(payload.nonce);
        this.inProgress = false;
      })
      .catch(error => {
        this.error = error;
        this.inProgress = false;
      });
  }

  detectChanges() {
    this.cd.markForCheck();
    this.cd.detectChanges();
  }

  ngOnDestroy() {
  }

}
