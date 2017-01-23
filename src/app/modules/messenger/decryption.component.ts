import { Component, Input, ChangeDetectorRef }  from '@angular/core';

import { Storage } from '../../common/services/storage';

@Component({
  selector: 'm-decrypt',
  template: `
    {{message}}
  `
})

export class DecryptionComponent {

  message : string = "decrypting...";

  storage = new Storage();

  constructor(private cd : ChangeDetectorRef) {
  }


  @Input('message') set encrypted(value: string) {

    (<any>window).Crypt.setPrivateKey(this.storage.get('private-key'));

    (<any>window).Crypt.decrypt(value, (success) => {

			this.message = success;
      this.cd.markForCheck();
      this.cd.detectChanges();


		});

  }


}
