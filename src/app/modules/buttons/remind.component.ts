import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import { Client } from '../../common/services/api/client';


@Component({
  moduleId: 'module.id',
  selector: 'minds-button-remind',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(click)': 'remind()'
  },
  template: `
    <ion-icon name="md-repeat" class="m-ionic-icon" [class.selected]="selected"></ion-icon>
  `,
  //styleUrls: [ 'buttons.css' ]
})

export class RemindButtonComponent {

  entity = {
    'guid': null,
    'owner_guid': null,
  };

  selected : boolean = false;

  constructor(public client : Client, private loadingCtrl : LoadingController) {
  }

  @Input('entity') set _entity(value : any){
    if(!value)
      return;
    this.entity = value;
  }

  remind(){
    let loader = this.loadingCtrl.create({
      //content: "Please wait...",
    });
    loader.present();
    this.selected = true;

    this.client.post('api/v1/newsfeed/remind/' + this.entity.guid, {
      })
      .then(() => {
        loader.dismiss();

      })
      .catch(e => {
        loader.dismiss();
        this.selected = false;
      });

  }

}
