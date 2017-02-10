import { NgModule }     from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { Storage } from './services/storage';
import { ImgFadeDirective } from './directives/img-fade.directive';
import { ContenteditableModel } from './directives/content-editable-model.directive.ts';
import { AbbrPipe } from './pipes/abbr.pipe';
import { DomainPipe } from './pipes/domain.pipe';
import { TagsPipe } from './pipes/tags.pipe';
import { TextareaComponent } from './components/textarea.component';


@NgModule({
  imports: [ IonicModule ],
  providers: [ Storage ],
  declarations: [ ImgFadeDirective, ContenteditableModel, DomainPipe, AbbrPipe, TagsPipe, TextareaComponent ],
  exports: [ ImgFadeDirective, ContenteditableModel, DomainPipe, AbbrPipe, TagsPipe, TextareaComponent ]
})
export class CommonModule { }
