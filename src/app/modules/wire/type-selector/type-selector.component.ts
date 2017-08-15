import { Component, Input, EventEmitter, Output, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActionSheetController } from "ionic-angular";
import { WireTypeLabels } from "../wire";

@Component({
  moduleId: 'module.id',
  selector: 'm-wire-type-selector',
  templateUrl: 'type-selector.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WireTypeSelectorComponent {
  @Input('type') type: string;
  @Output('typeChange') typeChangeEmitter: EventEmitter<string> = new EventEmitter<string>();

  typeLabels = WireTypeLabels;

  constructor(private cd: ChangeDetectorRef, private actionSheetCtrl: ActionSheetController) { }

  getCurrentTypeLabel() {
    return this.typeLabels.find(typeLabel => typeLabel.type == this.type);
  }

  selectType() {
    let labelButtons = [];

    for (let typeLabel of WireTypeLabels) {
      labelButtons.push({
        text: typeLabel.label,
        icon: typeLabel.icon,
        handler: () => {
          this.type = typeLabel.type;
          this.detectChanges();

          this.typeChangeEmitter.emit(this.type);
        }
      });
    }

    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select',
      buttons: [
        ...labelButtons,
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            // NO-OP
          }
        }
      ]
    });

    actionSheet.present();
  }

  detectChanges() {
    this.cd.markForCheck();
    this.cd.detectChanges();
  }
}
