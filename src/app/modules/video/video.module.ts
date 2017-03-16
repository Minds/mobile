import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { CommonModule } from '../../common/common.module';
import { VideoComponent } from "./video.component";

@NgModule({
  imports: [ IonicModule, CommonModule ],
  declarations: [ VideoComponent ],
  exports: [ VideoComponent ],
  entryComponents: [ VideoComponent ]
})
export class VideoModule { }
