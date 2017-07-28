import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule, App } from 'ionic-angular';

import { CommonModule } from '../../../common/common.module';
import { BoostCreatorFabController } from './fab';
import { DatePicker } from '@ionic-native/date-picker';
import { BoostCreatorService } from './creator.service';
import { BoostCreatorComponent } from './creator.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule
  ],
  declarations: [
    BoostCreatorComponent
  ],
  providers: [
    BoostCreatorService,
    BoostCreatorFabController,
    DatePicker
  ],
  entryComponents: [
    BoostCreatorComponent
  ]
})
export class BoostCreatorModule { }
