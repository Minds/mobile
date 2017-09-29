import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';

import { RegisterComponent } from './register.component';
import { TabsComponent } from '../tabs/tabs.component';
import { OAuth2 } from '../../common/services/api/oauth2';
import { PushService } from '../push/push.service';
import { SocketsService } from "../../common/services/api/sockets.service";
import { CurrentUserService } from "../../common/services/current-user.service";

@Component({
  moduleId: 'module.id',
  selector: 'login',
  templateUrl: 'login.component.html',
  providers: [
    CurrentUserService
  ]
  //styleUrls: ['login.component.css']
})

export class LoginComponent {

  keyboardVisible : boolean = false;
  keyboardShowSubscription;
  keyboardHideSubscription;

  constructor(private oauth2 : OAuth2, private nav : NavController, public loadingCtrl: LoadingController, private alertCtrl: AlertController,
    private push : PushService, private sockets: SocketsService, private cd: ChangeDetectorRef, private keyboard: Keyboard, private currentUser: CurrentUserService){
  }

  ionViewDidEnter(){
    setTimeout(() => {
      this.keyboard.disableScroll(true);
    }, 100);
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

  login(username, password, e){
    e.preventDefault();

    let loader = this.loadingCtrl.create({
      //content: "Please wait...",
    });
    loader.present();

    this.oauth2.login(username.value, password.value, (success) => {
      loader.dismiss();
      if(success){
        this.push.registerToken();
        this.currentUser
          .destroy()
          .fetch();
        this.nav.setRoot(TabsComponent);
      } else {
        let alert = this.alertCtrl.create({
          title: 'Sorry!',
          subTitle: "We could not log you in. Please check your credentials",
          buttons: ['Try again']
        });
        alert.present();
      }
    });
    //this.routerExtensions.navigate(['/tab/newsfeed'], { clearHistory: true });
  }

  register(){
    this.nav.push(RegisterComponent);
  }

  ngOnDestroy(){
    this.keyboardShowSubscription.unsubscribe();
    this.keyboardHideSubscription.unsubscribe();
  }

}
