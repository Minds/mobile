import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { Client } from '../../common/services/api/client';


@Component({
  moduleId: module.id,
  selector: 'minds-button-comment',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
      <Label class="material-icon" text="chat_bubble"></Label>
  `,
  styleUrls: ['buttons.css']
})

export class CommentButtonComponent {

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
