import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { Client } from '../../common/services/api/client';
import { CommentsList } from '../comments/list.component';


@Component({
  moduleId: 'module.id',
  selector: 'minds-button-wire',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ion-icon name="ios-flash" class="m-ionic-icon"></ion-icon>
  `,
  //styleUrls: ['buttons.css']
})

export class WireButtonComponent {

  @Input() entity;

  components = {
  }

  constructor(public client : Client) {
  }

}
