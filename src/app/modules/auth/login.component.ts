import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';

import { RegisterComponent } from './register.component';
import { TabsComponent } from '../tabs/tabs.component';
import { OAuth2 } from '../../common/services/api/oauth2';
import { PushService } from '../push/push.service';

@Component({
  moduleId: 'module.id',
  selector: 'login',
  templateUrl: 'login.component.html',
  //styleUrls: ['login.component.css']
})

export class LoginComponent {

  constructor(private oauth2 : OAuth2, private nav : NavController, public loadingCtrl: LoadingController, private alertCtrl: AlertController,
    private push : PushService){
  }

  ngOnInit(){
    if(this.oauth2.hasAccessToken()){
      this.nav.setRoot(TabsComponent);
    }
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

}
