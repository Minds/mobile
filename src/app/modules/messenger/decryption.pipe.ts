import { Pipe, Inject, Renderer }  from '@angular/core';

import { Storage } from '../../common/services/storage';

@Pipe({
  name: 'decrypt',
  pure: false
})

export class DecryptionPipe {

  message : string = "";

  storage = new Storage();

  constructor() {
  }


  transform(value: string) {

    if(!value)
      return value;

    (<any>window).Crypt.setPrivateKey(this.storage.get('private-key'));

    (<any>window).Crypt.decrypt(value, (success) => {
		  //  this/essage = $filter('linky')(success);
			//scope.$apply();
      console.log(success);
			this.message = success;
		});

    return this.message;

  }


}
