import { NgModule }     from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { CommonModule } from '../../common/common.module';
import { TranslatePipe } from './translate.pipe';
import { TranslationViewComponent } from './view.component';
import { LanguagesComponent } from './languages.component';
import { TranslationsService } from './translations.service';

@NgModule({
  imports: [ IonicModule, CommonModule ],
  providers: [
    TranslationsService
  ],
  declarations: [ TranslatePipe, LanguagesComponent, TranslationViewComponent ],
  exports: [ TranslatePipe, LanguagesComponent, TranslationViewComponent ],
  entryComponents: [ LanguagesComponent ]
})
export class TranslationsModule { }
