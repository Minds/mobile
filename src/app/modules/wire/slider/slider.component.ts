import { Component, Input, EventEmitter, Output, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Slides } from "ionic-angular";

import { WireFabController } from "../fab";
import { WireRewardsType, WireRewardsTiers } from "../interfaces/wire.interfaces";

@Component({
  moduleId: 'module.id',
  selector: 'm-wire-slider',
  templateUrl: 'slider.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WireSliderComponent {
  @ViewChild(Slides) private slider: Slides;

  @Input() channel;
  @Input() type: WireRewardsType;

  @Input() autoplay: boolean = true;

  rewards: WireRewardsTiers = [];

  @Input('rewards') set _rewards(rewards: WireRewardsTiers) {
    this.rewards = rewards.map((reward) => {
      if (!reward.type && this.type)
        reward.type = this.type;
      return reward;
    });

    if (!this.rewards) {
      this.rewards = [];
    }

    this._sliderReady(true)
      .then(slider => slider.update());
  }

  @Output('rewardsChange') rewardsChangeEmitter: EventEmitter<WireRewardsTiers> = new EventEmitter<WireRewardsTiers>();

  editing: boolean = false;
  @Input('editing') set _editing(value: boolean) {
    this.editing = value;

    if (this.editing && !this.rewards.length) {
      this.addTier();
    } else if (!this.editing) {
      this.rewardsChangeEmitter.emit(this.rewards);
    }
  }

  amount: number = 0;

  @Input('slideToAmount') set _amount(value: number) {
    if (!value) {
      return;
    }

    this.amount = value;

    this.slideToAmount();
  }

  @Input() sums: any;

  constructor(private cd: ChangeDetectorRef, private fab: WireFabController) { }

  ngAfterViewInit() {
    try {
      this.slider.autoHeight = true;
    } catch (e) {
      this._sliderReady()
        .then(slider => slider.autoHeight = true);
    }

    this.slideToAmount();
  }

  addTier() {
    this.rewards.push({
      amount: '',
      description: ''
    });
  }

  setAmount(index, value) {
    this.rewards[index].amount = value;
  }

  setDescription(index, value) {
    this.rewards[index].description = value;
  }

  getAmountPlaceholder() {
    let placeholder;

    switch (this.type) {
      case 'points':
        placeholder = 'Points';
        break;

      case 'money':
        placeholder = '$ USD';
        break;
    }

    return placeholder;
  }

  slideToAmount() {
    if (!this.rewards || !this.calcAmount()) {
      return false;
    }

    const lastEligibleReward = this.rewards
      .map((reward, index) => ({ ...reward, index }))
      .filter(reward => this.calcAmount() >= reward.amount)
      .pop();

    let index = lastEligibleReward ? lastEligibleReward.index : 0;

    this._sliderReady()
      .then(slider => {
        if (slider.getActiveIndex() === index) {
          return;
        }

        try {
          slider.slideTo(index, 0);
        } catch (e) {
          setTimeout(() => {
            this.slideToAmount()
          }, 1000);
        }
      });
  }

  calcAmount(): number {
    if (this.sums && this.sums[this.type]) {
      return parseFloat(this.sums[this.type]) + this.amount;
    }

    return <number>this.amount;
  }

  private _sliderReadyRefreshing: boolean;
  private _sliderReadyPromise: Promise<Slides>;
  private _sliderReady(refresh?: boolean): Promise<Slides> {
    if ((!this._sliderReadyPromise || refresh) && !this._sliderReadyRefreshing) {
      this._sliderReadyRefreshing = true;

      this._sliderReadyPromise = new Promise<Slides>((resolve, reject) => {
        if (!this.slider || !this.slider.getActiveIndex /* checking fn itself */ || refresh) {
          setTimeout(() => {
            this._sliderReadyRefreshing = false;
            resolve(this.slider);
          }, 350);
        } else {
          resolve(this.slider);
        }
      });
    }

    return this._sliderReadyPromise;
  }

  sendWire(reward) {
    const fab = this.fab.create({
      guid: this.channel.guid,
      default: {
        min: reward.amount,
        type: reward.type
      }
    });
    fab.present();
  }

  detectChanges() {
    this.cd.markForCheck();
    this.cd.detectChanges();
  }
}
