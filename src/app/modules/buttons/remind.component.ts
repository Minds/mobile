import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { RemindComponent } from "../remind/remind.component";

@Component({
  moduleId: 'module.id',
  selector: 'minds-button-remind',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(click)': 'remind()'
  },
  template: `
    <ion-icon name="md-repeat" class="m-ionic-icon" [class.selected]="reminded"></ion-icon>
  `,
  //styleUrls: [ 'buttons.css' ]
})

export class RemindButtonComponent {

  entity = {
    'guid': null,
    'owner_guid': null,
  };

  selected : boolean = false;

  constructor(private modalCtrl: ModalController) {
  }

  @Input('entity') set _entity(value : any){
    if(!value)
      return;
    this.entity = value;
  }

  remind() {
    const modal = this.modalCtrl
      .create(RemindComponent, { entity: this.entity });

    modal.onDidDismiss((data = { success: false }) => {
      if (!data.success) {
        return;
      }

      this.selected = true;
    });

    modal.present();
  }
}
