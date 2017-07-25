import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';

import { TabsComponent } from '../tabs/tabs.component';
import { OnboardingComponent } from '../onboarding/onboarding.component';
import { Client } from '../../common/services/api/client';
import { OAuth2 } from '../../common/services/api/oauth2';
import { PushService } from '../push/push.service';
import { SocketsService } from "../../common/services/api/sockets.service";
import { CurrentUserService } from "../../common/services/current-user.service";

@Component({
  moduleId: 'module.id',
  selector: 'register',
  templateUrl: 'register.component.html'
})

export class RegisterComponent {

  keyboardVisible : boolean = false;
  keyboardShowSubscription;
  keyboardHideSubscription;

  tos : boolean = true;

  constructor(private client : Client, private oauth2 : OAuth2, private nav : NavController, public loadingCtrl: LoadingController,
    private alertCtrl: AlertController, private push : PushService, private sockets: SocketsService, private cd : ChangeDetectorRef, private keyboard: Keyboard, private currentUser: CurrentUserService){
  }

  ionViewDidEnter(){
    this.keyboard.disableScroll(true);
  }

  ionViewWillLeave(){
    this.keyboard.disableScroll(false);
  }

  ngOnInit(){
    if(this.oauth2.hasAccessToken()){
      this.nav.setRoot(TabsComponent);
      this.sockets.reconnect();
    }

    this.keyboardShowSubscription = this.keyboard.onKeyboardShow().subscribe(() => {
      this.keyboardVisible = true;
      this.cd.markForCheck();
      this.cd.detectChanges();
    });
    this.keyboardHideSubscription = this.keyboard.onKeyboardHide().subscribe(() => {
      this.keyboardVisible = false;
      this.cd.markForCheck();
      this.cd.detectChanges();
    });
  }

  register(username, email, password, e){
    e.preventDefault();

    if(!this.tos){
      let alert = this.alertCtrl.create({
        title: 'Please accept the Terms and Conditions',
        buttons: ['Ok!']
      });
      alert.present();
      return;
    }

    let loader = this.loadingCtrl.create({
      //content: "Please wait...",
    });
    loader.present();

    this.client.post('api/v1/register', {
        username: username.value,
        password: password.value,
        email: email.value,
      })
      .then((response : any) => {
        loader.dismiss();
        if(response.status == 'success'){
          //take to onboarding flow
          this.push.registerToken();
          this.login(username.value, password.value)
            .then(() => {
              this.nav.setRoot(OnboardingComponent);
            })
            .catch(() => {
              let alert = this.alertCtrl.create({
                title: 'Sorry there was a problem!',
                buttons: ['Try again']
              });
              alert.present();
            });
        } else {
          let alert = this.alertCtrl.create({
            title: 'Sorry!',
            subTitle: response.message,
            buttons: ['Try again']
          });
          alert.present();
        }
      })
      .catch(() => {
        loader.dismiss();
      });
      //this.routerExtensions.navigate(['/tab/newsfeed'], { clearHistory: true });
  }

  login(username, password){
    let loader = this.loadingCtrl.create({
      //content: "Please wait...",
    });
    loader.present();

    return new Promise((resolve, reject) => {
      this.oauth2.login(username, password, (success) => {
        loader.dismiss();
        if (success) {
          this.currentUser
            .destroy()
            .fetch();
          return resolve(success);
        }
        reject();
      });
    });

  }

  showTOS(){
    (<any>window).open('https://www.minds.com/p/terms', "_system");
  }

  ngOnDestroy(){
    this.keyboardShowSubscription.unsubscribe();
    this.keyboardHideSubscription.unsubscribe();
  }

}
