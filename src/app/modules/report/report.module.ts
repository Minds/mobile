import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from 'ionic-angular';

import { ReportService } from './report.service';

@NgModule({
  imports: [ IonicModule ],
  providers: [
    ReportService
  ]
})
export class ReportModule { }
