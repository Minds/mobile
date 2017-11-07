import { Component, Input } from '@angular/core';

import { BoostService } from '../../boost.service';
import { Reason, rejectionReasons } from '../../rejection-reasons';;

import { CurrentUserService } from '../../../../common/services/current-user.service';

@Component({
  moduleId: 'module.id',
  providers: [BoostService],
  selector: 'm-boost-console-card',
  templateUrl: 'card.component.html'
})
export class BoostConsoleCard {

  boost: any;
  type: string;
  user: any;

  reasons: Array<Reason> = rejectionReasons;

  constructor(public service: BoostService, private currentUser: CurrentUserService) {
  }

  @Input('boost')
  set _boost(boost: any) {
    this.boost = boost;
    this.type = this.service.getBoostType(this.boost) || '';
  }

  ngOnInit(){
    this.currentUser.get().then((user: any) => {
      this.user = user;
    });
  }

  accept() {
    let agreed = true;

    if (this.boost.bidType === 'usd' && this.boost.postToFacebook) {
      agreed = confirm(`I accept a 5% transaction fee and agree not to delete this content from Facebook`);
    } else if (this.boost.bidType === 'usd') {
      agreed = confirm(`I accept a 5% transaction fee`);
    } else if (this.boost.postToFacebook) {
      agreed = confirm(`I agree not to delete this content from Facebook`);
    }

    if (!agreed) {
      return Promise.resolve(false);
    }

    return this.service.accept(this.boost);
  }

  canAccept() {
    return this.service.canAccept(this.boost, this.user);
  }

  reject() {
    return this.service.reject(this.boost);
  }

  canReject() {
    return this.service.canReject(this.boost, this.user);
  }

  revoke() {
    return this.service.revoke(this.boost);
  }

  canRevoke() {
    return this.service.canRevoke(this.boost, this.user);
  }

  isIncoming() {
    return this.service.isIncoming(this.boost, this.user);
  }

  findReason(code: number): Reason {
    return rejectionReasons.find((item: Reason) => {
      return item.code == code;
    });
  }

}
