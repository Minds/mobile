import { Component, Input, EventEmitter, Output, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Client } from "../../../common/services/api/client";
import { WireRewardsStruc, WireRewardsType } from "../interfaces/wire.interfaces";
import { WireTypeLabels } from "../wire";
import { WireFabController } from "../fab";
import { CurrentUserService } from "../../../common/services/current-user.service";

@Component({
  moduleId: 'module.id',
  selector: 'm-wire-channel',
  templateUrl: 'channel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WireChannelComponent {
  rewards: WireRewardsStruc;

  @Input('rewards') set _rewards(rewards: WireRewardsStruc) {
    if (rewards) {
      for (let type in rewards.rewards) {
        rewards.rewards[type] = rewards.rewards[type].map((reward) => {
          reward.type = type;
          return reward;
        });
      }
      rewards.rewards.merged = rewards.rewards.money.concat(rewards.rewards.points);
      this.rewards = rewards;
    } else {
      this.reset();
    }
  }

  @Output('rewardsChange') rewardsChangeEmitter: EventEmitter<WireRewardsStruc> = new EventEmitter<WireRewardsStruc>();

  @Input() channel: any;

  editing: boolean;

  display: WireRewardsType;

  userSums: { money, points } = {
    money: 0,
    points: 0
  }

  private currentUserIsOwner: boolean;

  constructor(private client: Client, private fab: WireFabController, private cd: ChangeDetectorRef, private currentUser: CurrentUserService) { }

  ngOnInit() {
    if (!this.rewards) {
      this.reset();
    }

    this.syncCurrentUser();
    this.setDefaultDisplay();
    this.loadUserReceived();

    this.detectChanges();
  }

  // TODO: Smart default display, based on current user
  setDefaultDisplay() {
    this.display = 'points';

    if (this.shouldShow('money')) {
      this.display = 'money';
    }
  }

  setDisplay(display: WireRewardsType) {
    this.display = display;
    this.detectChanges();
  }

  toggleEditing() {
    this.editing = !this.editing;
    this.detectChanges();

    if (!this.editing) {
      this.save();
    }
  }

  reset() {
    this.rewards = {
      description: '',
      rewards: {
        points: [],
        money: [],
        merged: []
      }
    }
  }

  syncCurrentUser() {
    return this.currentUser.get()
      .then(user => {
        this.currentUserIsOwner = user.guid == this.channel.guid;
        this.detectChanges();

        return user;
      });
  }

  loadUserReceived() {
    this.client.get(`api/v1/wire/rewards/${this.channel.guid}`)
      .then(({ sums }) => {
        this.userSums = sums;
        this.detectChanges();
      });
  }

  save() {
    this.rewards.rewards.points = this._cleanAndSortRewards(this.rewards.rewards.points);
    this.rewards.rewards.money = this._cleanAndSortRewards(this.rewards.rewards.money);

    this.client.post('api/v1/wire/rewards', {
      rewards: this.rewards
    })
      .then(() => {
        this.rewardsChangeEmitter.emit(this.rewards);
        this.detectChanges();
      })
      .catch(e => {
        this.editing = true;
        this.detectChanges();
        alert((e && e.message) || 'Server error');
      });

    this.detectChanges();
  }

  sendWire() {
    const fab = this.fab.create({ guid: this.channel.guid });
    fab.present();
  }

  isOwner() {
    return this.currentUserIsOwner;
  }

  shouldShow(type?: WireRewardsType) {
    const isOwner = this.isOwner();

    if (!type) {
      return isOwner || (this.rewards.description || this.rewards.rewards.points.length || this.rewards.rewards.money.length);
    }

    const canShow = (type == 'points') || this.channel.merchant;

    return canShow && (isOwner || this.rewards.rewards[type].length);
  }

  // Internal

  private _cleanAndSortRewards(rewards: any[]) {
    if (!rewards) {
      return [];
    }

    return rewards
      .filter(reward => reward.amount || `${reward.description}`.trim())
      .map(reward => ({ ...reward, amount: Math.floor(reward.amount || 0) }))
      .sort((a, b) => a.amount > b.amount ? 1 : -1)
  }

  detectChanges() {
    this.cd.markForCheck();
    this.cd.detectChanges();
  }
}
