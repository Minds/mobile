import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { Client } from '../../common/services/api/client';


@Component({
  selector: 'minds-button-thumbs-down',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
      <Label class="material-icon" text="thumb_down"></Label>
  `
})

export class ThumbsDownComponent {

  entity = {
    'guid': null,
    'owner_guid': null,
    'thumbs:up:user_guids': []
  };

  constructor(public client : Client) {
  }

  @Input('entity') set _entity(value : any){
    if(!value)
      return;
    this.entity = value;
    if(!this.entity['thumbs:up:user_guids'])
      this.entity['thumbs:up:user_guids'] = [];
  }

  thumb(){
    var self = this;

    if(!this.session.isLoggedIn()){
      this.modal.setSubtitle("You need to have a channel to vote").open();
      this.showModal = true;
      return false;
    }

    this.client.put('api/v1/thumbs/' + this.object.guid + '/up', {});
    if(!this.has()){
      //this.object['thumbs:up:user_guids'].push(this.session.getLoggedInUser().guid);
      this.object['thumbs:up:user_guids'] = [this.session.getLoggedInUser().guid];
      this.object['thumbs:up:count']++;
      if (this.session.getLoggedInUser().guid != this.object.owner_guid) {
        self.wallet.increment();
      }
    } else {
      for(let key in this.object['thumbs:up:user_guids']){
        if(this.object['thumbs:up:user_guids'][key] == this.session.getLoggedInUser().guid)
          delete this.object['thumbs:up:user_guids'][key];
      }
      this.object['thumbs:up:count']--;
      if (this.session.getLoggedInUser().guid != this.object.owner_guid) {
        self.wallet.decrement();
      }
    }
  }

  has(){
    for(var guid of this.entity['thumbs:up:user_guids']){
      //if(guid == this.session.getLoggedInUser().guid)
      //  return true;
    }
    return false;
  }

}
