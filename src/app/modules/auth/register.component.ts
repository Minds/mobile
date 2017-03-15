import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { Keyboard } from 'ionic-native';

import { TabsComponent } from '../tabs/tabs.component';
import { OnboardingComponent } from '../onboarding/onboarding.component';
import { Client } from '../../common/services/api/client';
import { OAuth2 } from '../../common/services/api/oauth2';
import { PushService } from '../push/push.service';
import { SocketsService } from "../../common/services/api/sockets.service";

@Component({
  moduleId: 'module.id',
  selector: 'register',
  templateUrl: 'register.component.html'
})

export class RegisterComponent {

  keyboardVisible : boolean = false;
  keyboardShowSubscription;
  keyboardHideSubscription;

  constructor(private client : Client, private oauth2 : OAuth2, private nav : NavController, public loadingCtrl: LoadingController,
    private alertCtrl: AlertController, private push : PushService, private sockets: SocketsService, private cd : ChangeDetectorRef){
  }

  ngOnInit(){
    if(this.oauth2.hasAccessToken()){
      this.nav.setRoot(TabsComponent);
      this.sockets.reconnect();
    }

    this.keyboardShowSubscription = Keyboard.onKeyboardShow().subscribe(() => {
      this.keyboardVisible = true;
      this.cd.markForCheck();
      this.cd.detectChanges();
    });
    this.keyboardHideSubscription = Keyboard.onKeyboardHide().subscribe(() => {
      this.keyboardVisible = false;
      this.cd.markForCheck();
      this.cd.detectChanges();
    });
  }

  register(username, email, password, e){
    e.preventDefault();

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
          this.nav.setRoot(OnboardingComponent);
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

  ngOnDestroy(){
    this.keyboardShowSubscription.unsubscribe();
    this.keyboardHideSubscription.unsubscribe();
  }

}
