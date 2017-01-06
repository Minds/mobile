import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { Client } from '../../common/services/api/client';


@Component({
  moduleId: 'module.id',
  selector: 'minds-button-thumbs-down',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ion-icon name="md-thumbs-down" class="m-ionic-icon"></ion-icon>
  `,
  //styleUrls: ['buttons.css']
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

}
