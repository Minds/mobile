import { NgModule }     from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { ImgFadeDirective } from './directives/img-fade.directive';
import { DomainPipe } from './pipes/domain.pipe';
import { TextareaComponent } from './components/textarea.component';


@NgModule({
  imports: [ IonicModule ],
  declarations: [ ImgFadeDirective, DomainPipe, TextareaComponent ],
  exports: [ ImgFadeDirective, DomainPipe, TextareaComponent ]
})
export class CommonModule { }
