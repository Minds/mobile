import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule, App } from 'ionic-angular';

import { CommonModule } from '../../common/common.module';
import { PaymentsModule } from '../payments/payments.module';
import { WireFabController } from './fab';
import { WireFabComponent } from './fab.component';
import { WireService } from './wire.service';
import { CardSelectorComponent } from './card-selector/minds-card-selector.component';
import { WireThresholdInputComponent } from "./threshold-input/threshold-input.component";
import { WireChannelComponent } from "./channel/channel.component";
import { WireSliderComponent } from "./slider/slider.component";
import { WireTypeSelectorComponent } from "./type-selector/type-selector.component";
import { WireLockScreenComponent } from "./lock-screen/lock-screen.component";

@NgModule({
  imports: [ IonicModule, CommonModule, PaymentsModule ],
  declarations: [ CardSelectorComponent, WireFabComponent, WireThresholdInputComponent, WireChannelComponent, WireSliderComponent, WireTypeSelectorComponent, WireLockScreenComponent ],
  providers: [
    WireFabController,
    WireService
  ],
  exports: [ CardSelectorComponent, WireFabComponent, WireThresholdInputComponent, WireChannelComponent, WireLockScreenComponent ],
  entryComponents: [ WireFabComponent, WireThresholdInputComponent ]
})
export class WireModule { }
