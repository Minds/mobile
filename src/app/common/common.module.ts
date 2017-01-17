import { NgModule }     from '@angular/core';

import { ImgFadeDirective } from './directives/img-fade.directive';
import { DomainPipe } from './pipes/domain.pipe';

@NgModule({
  declarations: [ ImgFadeDirective, DomainPipe ],
  exports: [ ImgFadeDirective, DomainPipe ]
})
export class CommonModule { }
