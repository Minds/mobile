import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { Client } from '../../common/services/api/client';
import { CommentsList } from '../comments/list.component';
import { WireFabController } from '../wire/fab';

@Component({
  moduleId: 'module.id',
  selector: 'minds-button-wire',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ion-icon name="ios-flash" class="m-ionic-icon" (click)="open($event)"></ion-icon>
  `,
  //styleUrls: ['buttons.css']
})

export class WireButtonComponent {

  @Input() entity;

  components = {
  }

  constructor(public client : Client, private fab : WireFabController) {
  }

  open(e){
    let fab = this.fab.create({
      guid: this.entity.guid,
      default: this.entity && this.entity.wire_threshold
    });
    fab.present();
  }

}
