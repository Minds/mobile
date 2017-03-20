import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { Client } from '../../common/services/api/client';
import { Storage } from '../../common/services/storage';
import { WalletService } from '../wallet/wallet.service';

@Component({
  moduleId: 'module.id',
  selector: 'minds-button-thumbs-up',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(click)': 'thumb()'
  },
  template: `
    <ion-icon name="md-thumbs-up" class="m-ionic-icon" [class.selected]="has()" [class.m-animate-button]="animate"></ion-icon>
    <span class="m-ionic-icon--counter" [class.m-ionic-icon--counter-hide]="!entity['thumbs:up:count'] || entity['thumbs:up:count'] == 0">({{entity['thumbs:up:count']}})</span>
  `,
  //styleUrls: [ 'buttons.css' ]
})

export class ThumbsUpComponent {

  entity = {
    'guid': null,
    'owner_guid': null,
    'thumbs:up:user_guids': []
  };

  storage = new Storage();
  animate : boolean = false;

  constructor(public client : Client, private wallet : WalletService) {
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

    this.client.put('api/v1/thumbs/' + this.entity.guid + '/up', {});
    if(!this.has()){
      //this.entity['thumbs:up:user_guids'].push(this.session.getLoggedInUser().guid);
      this.entity['thumbs:up:user_guids'] = [ this.storage.get('user_guid') ];
      this.entity['thumbs:up:count']++;
      this.animate = true;
      if ( this.storage.get('user_guid') != this.entity.owner_guid) {
        //this.wallet.increment(1);
      }
    } else {
      for(let key in this.entity['thumbs:up:user_guids']){
        if(this.entity['thumbs:up:user_guids'][key] ==  this.storage.get('user_guid'))
          delete this.entity['thumbs:up:user_guids'][key];
      }
      this.entity['thumbs:up:count']--;
      this.animate = false;
      if ( this.storage.get('user_guid')!= this.entity.owner_guid) {
        //this.wallet.decrement(1);
      }
    }
  }

  has(){
    for(var guid of this.entity['thumbs:up:user_guids']){
      if(guid == this.storage.get('user_guid'))
        return true;
    }
    return false;
  }

}
