import { NgModule }     from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { ImgFadeDirective } from './directives/img-fade.directive';
import { AbbrPipe } from './pipes/abbr.pipe';
import { DomainPipe } from './pipes/domain.pipe';
import { TextareaComponent } from './components/textarea.component';


@NgModule({
  imports: [ IonicModule ],
  declarations: [ ImgFadeDirective, DomainPipe, AbbrPipe, TextareaComponent ],
  exports: [ ImgFadeDirective, DomainPipe, AbbrPipe, TextareaComponent ]
})
export class CommonModule { }
