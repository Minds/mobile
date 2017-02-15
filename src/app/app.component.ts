import { Component, ViewChild } from "@angular/core";
import { Nav, MenuController, Platform, App } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import { TabsComponent } from "./modules/tabs/tabs.component";
import { LoginComponent } from "./modules/auth/login.component";
import { GroupProfile } from './modules/groups/profile.component';
import { NewsfeedList } from "./modules/newsfeed/list.component";
import { OAuth2 } from "./common/services/api/oauth2";
import { Storage } from "./common/services/storage";

//for testing onboarding
import { OnboardingComponent } from './modules/onboarding/onboarding.component';

@Component({
  selector: "ion-app",
  templateUrl: "app.component.html",
  ////styleUrls: ['app.component.css']
})

export class MindsApp {

  components = {
    group: GroupProfile
  };

  rootPage : any = LoginComponent;

  constructor(private oauth2 : OAuth2, public menuCtrl: MenuController, private platform : Platform, private app : App,
    private storage : Storage){
    platform.ready().then(() => {
      StatusBar.backgroundColorByHexString('#37474f');
    });
    if(this.oauth2.hasAccessToken()){
      this.rootPage = TabsComponent;
      //this.rootPage = OnboardingComponent;
    }
  }

  ngOnInit(){

  }

  openBugGroup(){
    this.app.getRootNav().push(GroupProfile, {guid:'100000000000000681'});
    this.menuCtrl.close();
  }

  logout(){
    (<any>window).localStorage.clear();
    this.app.getRootNav().push(LoginComponent);
    (<any>window).location.reload();
  }

}
