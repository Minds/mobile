import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { Client } from '../../common/services/api/client';


@Component({
  moduleId: 'module.id',
  selector: 'minds-button-remind',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
      <ion-icon name="md-repeat" class="m-ionic-icon"></ion-icon>
  `,
  //styleUrls: [ 'buttons.css' ]
})

export class RemindButtonComponent {

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


}
