import { Component, OnInit, OnDestroy, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

import { ChannelComponent } from '../channel/channel.component';
import { Client } from '../../common/services/api/client';
import { Storage } from '../../common/services/storage';

@Component({
  moduleId: 'module.id',
  selector: 'messenger-setup',
  templateUrl: 'setup.component.html',
  //styleUrls: ['list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MessengerSetup {

  storage = new Storage();

  ready : boolean = false;
  configured : boolean = false;

  constructor(private client : Client, private cd : ChangeDetectorRef, private params: NavParams, private nav : NavController,
    private loadingCtrl : LoadingController ){}

  ngOnInit(){

    let loader = this.loadingCtrl.create({
      content: "Please wait...",
    });
    loader.present();

    this.client.get('api/v1/channel/me')
      .then((response : any) => {
				if(response.channel.chat) {
					this.configured = true;
				}
        loader.dismiss();
        this.ready = true;
			});
  }

  unlock(password){
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
    });
    loader.present();

    this.client.get('api/v1/keys', {
        password: password.value,
        new_password: 'abc123'
      })
      .then((response : any) => {
        if(response.key){
          this.storage.set('private-key', response.key);
          this.nav.pop();
        } else {

        }
        loader.dismiss();
      })
      .catch(() => {
        loader.dismiss();
      });
  }

}
