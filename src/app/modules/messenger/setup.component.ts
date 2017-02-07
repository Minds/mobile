import { Component, OnInit, OnDestroy, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

import { MessengerList } from './list.component';
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

  ready : boolean = false;
  configured : boolean = false;


  constructor(private client : Client, private cd : ChangeDetectorRef, private params: NavParams, private nav : NavController,
    private loadingCtrl : LoadingController, private alertCtrl : AlertController, private storage : Storage ){}

  ngOnInit(){

    let loader = this.showLoader();

    this.client.get('api/v1/channel/me')
      .then((response : any) => {
				if(response.channel.chat) {
					this.configured = true;
				}
        loader.dismiss();
        this.ready = true;

        this.storage.set('user', JSON.stringify(response.channel));

        this.cd.markForCheck();
        this.cd.detectChanges();
			})
      .catch(() => {
        loader.dismiss();
      })
  }

  showLoader(){
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
    });
    loader.present();

    setTimeout(loader.dismiss, 5000);

    return loader;
  }

  unlock(password){

    let loader = this.showLoader();

    this.client.get('api/v1/keys', {
        password: password.value,
        new_password: 'abc123'
      })
      .then((response : any) => {
        loader.dismiss();
        if(response.key){
          this.storage.set('private-key', response.key);
          this.nav.setRoot(MessengerList);
        } else {
          this.alertCtrl.create({
              title: 'Sorry!',
              subTitle: "Please check your credentials",
              buttons: ['Try again']
            })
            .present();
        }
      })
      .catch(() => {
        loader.dismiss();
        this.alertCtrl.create({
            title: 'Sorry!',
            subTitle: "Please check your credentials",
            buttons: ['Try again']
          })
          .present();
      });
  }

  setup(password, password2){
    if(password.value != password2.value){
      this.alertCtrl.create({
          title: 'Sorry!',
          subTitle: "The passwords your entered do not match.",
          buttons: ['Try again']
        })
        .present();
      return;
    }

    let loader = this.showLoader();
    this.client.post('api/v1/keys/setup', {
				password: password.value
      })
      .then((response : any) => {
        loader.dismiss();
        if(response.key){
          this.storage.set('private-key', response.key);
        } else {
          this.alertCtrl.create({
              title: 'Ooops...',
              subTitle: "We couldn't setup your chat",
              buttons: ['Try again']
            })
            .present();
        }
      });
  }

}
