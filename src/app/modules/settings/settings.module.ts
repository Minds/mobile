import { NgModule }     from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { CommonModule } from '../../common/common.module';
import { SettingsComponent } from './settings.component';

@NgModule({
  imports: [ IonicModule, CommonModule ],
  declarations: [ SettingsComponent ],
  exports: [ SettingsComponent ],
  entryComponents: [ SettingsComponent ]
})
export class SettingsModule { }
