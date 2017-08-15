import { NgModule }     from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { Storage } from './services/storage';
import { ImgFadeDirective } from './directives/img-fade.directive';
import { ExplicitDirective } from './directives/explicit.directive';
import { ContenteditableModel } from './directives/content-editable-model.directive.ts';
import { AbbrPipe } from './pipes/abbr.pipe';
import { DomainPipe } from './pipes/domain.pipe';
import { TagsPipe } from './pipes/tags.pipe';
import { TextareaComponent } from './components/textarea.component';
import { RichInputComponent } from './components/rich-input.component.ts';
import { SafePipe } from "./pipes/safe.pipe";
import { PlatformFeaturesService } from "./services/platform-features.service";
import { AppStatusService } from "./services/app-status.service";
import { SuggestionsModule } from "../modules/suggestions/suggestions.module";

import { MDLIcon } from "./components/mdl-icon";

@NgModule({
  imports: [ IonicModule, SuggestionsModule ],
  providers: [ Storage, PlatformFeaturesService, AppStatusService ],
  declarations: [ ImgFadeDirective, ExplicitDirective, ContenteditableModel, DomainPipe, AbbrPipe, TagsPipe, TextareaComponent, RichInputComponent, SafePipe, MDLIcon ],
  exports: [ ImgFadeDirective, ExplicitDirective, ContenteditableModel, DomainPipe, AbbrPipe, TagsPipe, TextareaComponent, RichInputComponent, SafePipe, MDLIcon ]
})
export class CommonModule { }
