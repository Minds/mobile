import { Component, Input, ChangeDetectorRef, NgZone }  from '@angular/core';

import { Storage } from '../../common/services/storage';

@Component({
  selector: 'm-decrypt',
  template: `
    {{decrypted}}
  `
})

export class DecryptionComponent {

  @Input('message') message : string;
  decrypted : string = "decrypting...";

  storage = new Storage();

  constructor(private cd : ChangeDetectorRef, private zone : NgZone) {
  }

  ngAfterViewInit(){
    this.decrypt();
  }

  decrypt() {

      (<any>window).Crypt.setPrivateKey(this.storage.get('private-key'));

      (<any>window).Crypt.decrypt(this.message, (success) => {
          this.decrypted = success;
          //console.log('decrypted ' + success);
          this.cd.markForCheck();
          this.cd.detectChanges();
  		});

  }


}
