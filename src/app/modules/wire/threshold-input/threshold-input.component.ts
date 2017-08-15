import { Component, ViewChild, ElementRef, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { ViewController, NavParams, ActionSheetController } from "ionic-angular";
import { WireThresholdStruc, WireRewardsType } from "../interfaces/wire.interfaces";
import { WireTypeLabels } from "../wire";
import { CurrentUserService } from "../../../common/services/current-user.service";

@Component({
  moduleId: 'module.id',
  selector: 'm-wire--threshold-input',
  templateUrl: 'threshold-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WireThresholdInputComponent {
  constructor(
    private params: NavParams,
    private viewCtrl: ViewController,
    private cd: ChangeDetectorRef,
    private currentUser: CurrentUserService,
    private actionSheetCtrl: ActionSheetController
  ) { }

  threshold: WireThresholdStruc;

  enabled: boolean = false;
  merchant: boolean = false;

  typeLabels = WireTypeLabels;

  @ViewChild('minAmountInput') minAmountInput;

  ngOnInit() {
    if (this.params.get('threshold')) {
      this.threshold = this.params.get('threshold');
    }

    if (!this.threshold) {
      this.threshold = {
        type: 'points',
        min: 0
      };
    }

    this.detectChanges();

    this.focusInput();

    this.syncUser();
  }

  syncUser() {
    this.currentUser.get()
      .then(user => {
        this.merchant = user && user.merchant;
        if (this.merchant) {
          this.threshold = {
            type: 'money',
            min: 1
          };
        }
        this.detectChanges();
      });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  apply() {
    this.enabled = this.threshold.min > 0;
    this.viewCtrl.dismiss({
      threshold: this.enabled ? this.threshold : null
    });
  }

  toggle() {
    this.enabled = !this.enabled;
    this.detectChanges();

    if (this.enabled) {
      this.focusInput();
    }
  }

  selectType() {
    let labelButtons = [];

    for (let typeLabel of WireTypeLabels) {
      labelButtons.push({
        text: typeLabel.label,
        handler: () => {
          this.threshold.type = typeLabel.type;
          this.detectChanges();

          this.focusInput();
        }
      });
    }

    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select from',
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

  setType(type: WireRewardsType) {
    this.threshold.type = type;
    this.detectChanges();
  }

  setMinAmount(value: string) {
    const cleanValue = Math.floor(parseFloat(value.replace(/,/g, '')));
    this.threshold.min = !isNaN(cleanValue) ? cleanValue : 0;
    this.detectChanges();
  }

  isValid() {
    if (!this.enabled) {
      return true;
    }

    return !!(this.threshold.type && (this.threshold.min > 0));
  }

  focusInput() {
    setTimeout(() => {
      if (this.minAmountInput) {
        this.minAmountInput.setFocus();
      };
    }, 150);
  }

  detectChanges() {
    this.cd.markForCheck();
    this.cd.detectChanges();
  }
}
