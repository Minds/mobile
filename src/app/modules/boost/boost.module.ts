import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule, App } from 'ionic-angular';

import { CommonModule } from '../../common/common.module';
import { NewsfeedModule } from '../newsfeed/newsfeed.module';
import { BoostReviewComponent } from './boost.component';
import { BoostCreatorModule } from './creator/creator.module';
import { BoostConsoleCard } from './console/card/card.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    BoostCreatorModule,
    NewsfeedModule
  ],
  declarations: [
    BoostReviewComponent,
    BoostConsoleCard
  ],
  exports: [
    BoostReviewComponent,
    BoostConsoleCard
  ],
  entryComponents: [
    BoostReviewComponent
  ]
})
export class BoostModule { }
