import { ChangeDetectorRef, Component } from '@angular/core';
import { Client } from '../../../../common/services/api/client';
import { loadScript } from '../../../payments/scriptloader.service';
import { StripeCheckout } from '../../../payments/stripe/checkout.component';
import { AlertController, LoadingController, ModalController } from 'ionic-angular';

@Component({
  moduleId: 'module.id',
  selector: 'm-settings--billing-saved-cards',
  templateUrl: 'saved-cards.component.html'
})
export class SettingsBillingSavedCardsComponent {
  addNewCard: boolean = false;
  cards: Array<any> = [];
  stripe;
  token: string;

  constructor(private client: Client, private modalCtrl: ModalController, private loadingCtrl: LoadingController, private alertCtrl: AlertController, private cd: ChangeDetectorRef) {

  }

  ngOnInit() {
    this.loadSavedCards();
    this.setupStripe();
    setTimeout(() => {
      this.setupStripe();
    }, 1000); //sometimes stripe can take a while to download
  }

  setupStripe() {
    loadScript('https://js.stripe.com/v2', 'Stripe')
      .then(Stripe => {
        this.stripe = Stripe;
      });

    this.client.get('api/v1/payments/stripe/token/default')
      .then((response: any) => {
        this.token = response.token
      });
  }

  loadSavedCards(): Promise<any> {
    let loader = this.loadingCtrl.create();
    loader.present();
    this.cards = [];

    return this.client.get(`api/v1/payments/stripe/cards`)
      .then(({ cards }) => {
        loader.dismiss();

        if (cards && cards.length) {
          this.cards = cards;
          this.detectChanges();
        }
      })
      .catch(e => {
        loader.dismiss();
        this.detectChanges();
      });
  }

  removeCard(index: number) {
    let loader = this.loadingCtrl.create();
    loader.present();

    this.client.delete('api/v1/payments/stripe/card/' + this.cards[ index ].id)
      .then(() => {
        this.cards.splice(index, 1);

        loader.dismiss();
        this.detectChanges();
      })
      .catch(() => {
        loader.dismiss();
        this.detectChanges();
      });
  }

  setCard(card) {
    let loader = this.loadingCtrl.create();
    loader.present();
    this.detectChanges();

    this.saveCard(card)
      .then(() => {
        loader.dismiss();
        this.addNewCard = false;
        this.detectChanges();
        this.loadSavedCards();
      })
      .catch(() => {
        loader.dismiss();
        this.detectChanges();
        alert('There ware an error saving your card.');
      });
  }

  saveCard(token: string): Promise<any> {
    return this.client.put('api/v1/payments/stripe/card/' + token);
  }

  detectChanges(): void {
    this.cd.markForCheck();
    this.cd.detectChanges();
  }

  addCard() {
    let checkout = this.modalCtrl.create(StripeCheckout, {
      success: (nonce: string) => {
        this.setCard(nonce);
      },
      error: (msg) => {
        let alert = this.alertCtrl.create({
          title: 'Ooooopppsss...',
          subTitle: "We couldn't process your card details",
          buttons: [ 'Try again' ]
        });
        alert.present();
      }
    });
    checkout.present();
  }


}
