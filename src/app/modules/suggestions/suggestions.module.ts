import { NgModule }     from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { Client } from '../../common/services/api/client';

import { SuggestionsList } from "./suggestions.component";

@NgModule({
  imports: [ IonicModule ],
  providers: [ Client ],
  declarations: [ SuggestionsList ],
  exports: [ SuggestionsList ]
})
export class SuggestionsModule { }
