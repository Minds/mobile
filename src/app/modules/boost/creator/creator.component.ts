import { ChangeDetectorRef, Component, Input, AfterViewInit, ViewChild } from '@angular/core';
import { CONFIG } from '../../../config';
import { LoadingController, ModalController, NavParams, Tabs, ViewController } from 'ionic-angular';
import { CacheService } from '../../../common/services/cache/cache.service';
import { Storage } from '../../../common/services/storage';
import { Client } from '../../../common/services/api/client';
import { DiscoveryService } from '../../discovery/discovery.service';
import { DatePicker } from '@ionic-native/date-picker';
import { BoostStruc, BoostType, Category, CurrencyType, VisibleBoostError } from './types';
import { BoostCreatorService } from './creator.service';

@Component({
  moduleId: 'module.id',
  selector: 'm-boost--creator',
  templateUrl: 'creator.component.html'
})

export class BoostCreatorComponent implements AfterViewInit {

  @Input('entity') entity;
  @ViewChild('tabs') tabs: Tabs;

  inProgress: boolean = false;
  editingPoints: boolean = false;
  editingChannel: boolean = false;
  showChannelList: boolean = false;

  minds = {
    cdn_url: CONFIG.cdnUrl
  };

  boost: BoostStruc = {
    amount: 2500,
    currency: 'points',
    type: 'newsfeed',

    // General
    categories: [],
    priority: false,

    // P2P
    target: null,
    postToFacebook: false,
    scheduledTs: null,

    // Payment
    nonce: ''
  };

  // TODO: read from backend
  rates = {
    balance: null,
    rate: 1,
    min: 10,
    cap: 1000,
    usd: 1000,
    btc: 0,
    priority: 1,
    maxCategories: 3
  };

  allowedTypes: { newsfeed?, p2p?, content? } = {};
  categories: Category[] = [];

  loader;
  error: string = null;
  success: boolean = false;
  criticalError: boolean = false;
  userGuid: string;

  targetQuery: string = '';
  targetResults: any[] = [];

  constructor(private client: Client, public boostService: BoostCreatorService, public discoveryService: DiscoveryService, public cache: CacheService,
              public modalCtrl: ModalController, private params: NavParams, private datePicker: DatePicker,
              private viewCtrl: ViewController, private loadingCtrl: LoadingController, private cd: ChangeDetectorRef,
              private storage: Storage) {

    const guid: any = this.storage.get('user_guid');
    if (guid && typeof guid === 'string') {
      this.userGuid = guid;
    }

    this.loader = this.loadingCtrl.create({
      //content: "Please wait...",
    });
  }

  ngOnInit() {
    this.entity = this.params.get('entity');

    this.loadCategories();
    this.load();
  }

  ngAfterViewInit() {
    this.syncAllowedTypes();
  }

  /**
   * Loads and parses categories from global variable
   */
  loadCategories() {
    this.categories = [];

    this.client.get('api/v1/categories').then((categories: any) => {
      for (let id in categories.categories) {
        this.categories.push({
          id: id,
          label: categories.categories[ id ]
        });
      }
    }).catch(error => {
      console.error('got error: ', error);
      this.error = 'Error retrieving categories';
    });

    this.categories.sort((a, b) => a.label > b.label ? 1 : -1);
  }

  /**
   * Loads boost settings from server
   */
  load() {
    // TODO: Move to service and cache (maybe?)
    this.inProgress = true;

    return this.client.get(`api/v1/boost/rates`)
      .then((rates: any) => {
        this.inProgress = false;
        this.rates = rates;

        // TODO: Implement in backend and remove below
        this.rates = {
          btc: 0,
          maxCategories: 3,

          ...this.rates
        };
        //
      })
      .catch(e => {
        this.inProgress = false;
        this.criticalError = true;
        this.error = 'Internal server error';
      });
  }

  /**
   * Enables and disables types based on the current object
   */
  syncAllowedTypes() {
    if (!this.entity || !this.entity.type) {
      this.allowedTypes = {};
      this.boost.type = null;
      return;
    }

    switch (this.entity.type) {
      case 'activity':
        this.allowedTypes = {
          newsfeed: true,
          p2p: true
        };
        this.boost.type = 'newsfeed';
        break;

      default:
        this.allowedTypes = {
          content: true
        };
        this.boost.type = 'content';
        break;
    }
  }

  /**
   * Sets the boost type
   */
  setBoostType(type: BoostType | null) {
    this.boost.type = type;
    this.roundAmount();
    this.showErrors();
  }

  /**
   * Sets the boost currency, and rounds the amount if necessary
   */
  setBoostCurrency(currency: CurrencyType | null) {
    this.boost.currency = currency;
    this.roundAmount();
    this.showErrors();
  }

  /**
   * Sets the boost payment nonce
   */
  setBoostNonce(nonce: string | null) {
    this.boost.nonce = nonce;
    this.showErrors();
  }

  setBoostAmount(amount: string){
    if(!amount){
      this.boost.amount = 0;
      return;
    }
    amount = amount.replace(/,/g, "");
    this.boost.amount = parseInt(amount);
  }

  private _searchThrottle;
  /**
   * Searches the current target query on the server
   */
  searchTarget() {
    if (this._searchThrottle) {
      clearTimeout(this._searchThrottle);
      this._searchThrottle = void 0;
    }

    if (this.targetQuery.charAt(0) != '@') {
      this.targetQuery = '@' + this.targetQuery;
    }

    let query = this.targetQuery;
    if (query.charAt(0) == '@') {
      query = query.substr(1);
    }

    if (!query || query.length <= 2) {
      this.targetResults = [];
      return;
    }

    // TODO: Use /suggest?
    this._searchThrottle = setTimeout(() => {
      this.client.get(`api/v1/search`, {
        q: query,
        type: 'user',
        view: 'json',
        limit: 8
      })
        .then(({ entities }) => {
          if (!entities) {
            return;
          }

          this.targetResults = entities;
        })
        .catch(e => console.error('Cannot load results', e))
    });
  }

  /**
   * Sets the current target for a P2P boost
   */
  setTarget(target, $event?) {
    if ($event) {
      event.preventDefault();
    }

    this.boost.target = { ...target };
    this.targetResults = [];
    this.targetQuery = '@' + target.username;
    this.showErrors();
  }

  // Boost Pro

  togglePostToFacebook() {
    this.boost.postToFacebook = !this.boost.postToFacebook;
    if (this.boost.postToFacebook) {
      this.boost.scheduledTs = new Date().getTime() / 1000;
    }
  }

  /**
   * Opens DatePicker dialog
   */
  onChangeDate() {
    const now = new Date();
    let maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 3);

    this.datePicker.show({
      date: now,
      minDate: now,
      maxDate: maxDate,
      mode: 'datetime',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
    }).then(
      date => this.boost.scheduledTs = date.getTime() / 1000,
      err => this.error = 'Error occurred while getting date: ' + err
    );
  }

  // Categories

  /**
   * Toggles a category based on its current status
   */
  toggleCategory(id: string) {
    if (this.hasCategory(id)) {
      this.boost.categories.splice(this.boost.categories.indexOf(id), 1);
    } else {
      if (this.boost.categories.length >= this.rates.maxCategories) {
        return;
      }

      this.boost.categories.push(id);
    }
    this.validate();
  }

  /**
   * Checks if a category is toggled
   */
  hasCategory(id: string) {
    return this.boost.categories.indexOf(id) > -1;
  }

  // Priority

  /**
   * Toggles the priority based on its current status
   */
  togglePriority() {
    this.boost.priority = !this.boost.priority;
    this.validate();
  }

  /**
   * Round by 2 decimals if P2P and currency is unset or not points. If not, round down to an integer.
   */
  roundAmount() {
    if ((this.boost.type == 'p2p') && (!this.boost.currency || (this.boost.currency != 'points'))) {
      this.boost.amount = Math.round(parseFloat(`${this.boost.amount}`) * 100) / 100;
    } else {
      this.boost.amount = Math.floor(<number>this.boost.amount);
    }
  }

  getCurrencyText() {
    return this.boost.currency === 'usd' ? 'USD' : 'points';
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  // Charge and rates

  /**
   * Calculates base charges (not including priority or any other % based fee)
   */
  calcBaseCharges(type: CurrencyType): number {
    // P2P should just round down amount points. It's bid based.
    if (this.boost.type == 'p2p') {
      switch (type) {
        case 'points':
          return Math.floor(<number>this.boost.amount);
      }

      return <number>this.boost.amount;
    }

    // Non-P2P should do the views <-> currency conversion
    switch (type) {
      case 'usd':
        const usdFixRate = this.rates.usd / 100;
        return Math.ceil(<number>this.boost.amount / usdFixRate) / 100;

      case 'points':
        return Math.floor(<number>this.boost.amount / this.rates.rate);

      case 'btc':
        return 0; // TODO: Implement BTC
    }

    throw new Error('Unknown currency');
  }

  /**
   * Calculate charges including priority
   */
  calcCharges(type: CurrencyType): number {
    const charges = this.calcBaseCharges(type);

    return charges + (charges * this.getPriorityRate());
  }

  /**
   * Calculate priority charges (for its preview)
   */
  calcPriorityChargesPreview(type: CurrencyType): number {
    return this.calcBaseCharges(type) * this.getPriorityRate(true);
  }

  /**
   * Gets the priority rate, only if applicable
   */
  getPriorityRate(force?: boolean): number {
    // NOTE: No priority on P2P
    if (force || (this.boost.type != 'p2p' && this.boost.priority)) {
      return this.rates.priority;
    }

    return 0;
  }

  /**
   * validates view and shows errors
   */
  validate() {
    this.error = null;

    try {
      this.validateBoost();
    } catch (e) {
      if (e.visible) {
        this.error = e.message;
      }
    }
  }

  isValid(): boolean {
    return !this.error;
  }

  /**
   * Validates if the boost can be submitted using the current settings
   */
  validateBoost() {
    if (this.boost.amount <= 0) {
      throw new Error('Amount should be greater than zero.');
    }

    if (!this.boost.currency) {
      throw new Error('You should select a currency.');
    }

    if (!this.boost.type) {
      throw new Error('You should select a type.');
    }

    if (this.boost.currency == 'points') {
      const charges = this.calcCharges(this.boost.currency);

      if (charges > this.rates.balance) {
        throw new VisibleBoostError(`You only have ${this.rates.balance} points.`);
      }
    }

    if (this.boost.type == 'p2p') {
      if (!this.boost.target) {
        throw new VisibleBoostError('You should select a target.');
      }

      if (this.boost.target && (this.boost.target.guid == this.userGuid)) {
        throw new VisibleBoostError('You cannot boost to yourself.');
      }

      if (this.boost.target && !this.boost.target.merchant && (this.boost.currency != 'points')) {
        // TODO: Implement BTC (in message)
        throw new VisibleBoostError('User cannot receive USD.');
      }
    } else {
      if (this.boost.amount < this.rates.min || this.boost.amount > this.rates.cap) {
        throw new VisibleBoostError(`You can boost between ${this.rates.min} and ${this.rates.cap} views.`);
      }

      //if (!this.boost.categories.length) {
      //  throw new VisibleBoostError('You should select a category.');
      //}
    }
  }

  /**
   * Checks if the user can submit using the current settings
   */
  canSubmit() {
    try {
      this.validateBoost();
      return true;
    } catch (e) {
      // console.log(`Invalid boost: ${e.visible ? '[USERFACING] ' : ''}${e.message}`);
    }

    return false;
  }

  /**
   * Shows visible boost errors
   */
  showErrors() {
    this.error = '';

    try {
      this.validateBoost();
    } catch (e) {
      if (e.visible) {
        this.error = e.message;
      }
    }
  }

  /**
   * Submits the boost to the appropiate server endpoint using the current settings
   */
  submit() {
    if (this.inProgress) {
      return;
    }

    this.validate();

    if (!this.isValid()) {
      return;
    }

    this.inProgress = true;

    this.boostService.send(this.boost, this.entity)
      .then(({ done }) => {
        this.inProgress = false;

        if (done) {
          this.success = true;

          setTimeout(() => {
            this.dismiss();
          }, 2500);
        }
      })
      .catch(e => {
        this.inProgress = false;
        this.error = (e && e.message) || 'Sorry, something went wrong';
      });
  }
}
