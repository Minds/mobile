import { Pipe, Inject, Renderer }  from '@angular/core';
import { TranslationsService } from './translations.service';

@Pipe({
  name: 'translate',
  //pure: false
})

export class TranslatePipe {

  constructor() {
  }

  transform(value : string, language : string) {

    if(!language) //langauge to translate to not set yet
      return value;

    return 'you ask, we translate';

  }


}
