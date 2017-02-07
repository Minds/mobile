import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { Client } from '../../common/services/api/client';
import { CommentsList } from '../comments/list.component';


@Component({
  moduleId: 'module.id',
  selector: 'minds-button-comment',
  changeDetection: ChangeDetectionStrategy.OnPush,

  template: `
    <div [navPush]="components.comments" [navParams]="{ guid: entity.entity_guid ? entity.entity_guid : entity.guid }">
      <ion-icon name="md-chatbubbles" class="m-ionic-icon" [class.selected]="entity['comments:count'] > 0" ></ion-icon>
      <span class="m-ionic-icon--counter" *ngIf="entity['comments:count'] > 0">({{entity['comments:count']}})</span>
    </div>
  `,
  //styleUrls: ['buttons.css']
})

export class CommentButtonComponent {

  @Input() entity;

  components = {
    comments: CommentsList
  }

  constructor(public client : Client) {
  }

}
