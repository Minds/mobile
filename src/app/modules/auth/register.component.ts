import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';


import { TabsComponent } from '../tabs/tabs.component';
import { Client } from '../../common/services/api/client';
import { OAuth2 } from '../../common/services/api/oauth2';

@Component({
  moduleId: 'module.id',
  selector: 'register',
  templateUrl: 'register.component.html',
  //styleUrls: ['login.component.css']
})

export class RegisterComponent {

  constructor(private client : Client, private oauth2 : OAuth2, private nav : NavController,
    public loadingCtrl: LoadingController, private alertCtrl: AlertController){
  }

  ngOnInit(){
    if(this.oauth2.hasAccessToken()){
      this.nav.setRoot(TabsComponent);
    }
  }

  register(username, email, password, e){
    e.preventDefault();

    let loader = this.loadingCtrl.create({
      content: "Please wait...",
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
          this.nav.setRoot(TabsComponent);
        } else {
          let alert = this.alertCtrl.create({
            title: 'Sorry!',
            subTitle: response.message,
            buttons: ['Try again']
          });
          alert.present();
        }
      });
      //this.routerExtensions.navigate(['/tab/newsfeed'], { clearHistory: true });
  }

}
