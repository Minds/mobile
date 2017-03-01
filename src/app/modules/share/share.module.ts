import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from 'ionic-angular';

import { ShareService } from './share.service';

@NgModule({
  imports: [ IonicModule ],
  providers: [
    ShareService
  ]
})
export class ShareModule { }
