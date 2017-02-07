import { Component, ViewChild } from "@angular/core";
import { Nav, MenuController, Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import { TabsComponent } from "./modules/tabs/tabs.component";
import { LoginComponent } from "./modules/auth/login.component";
import { GroupProfile } from './modules/groups/profile.component';
import { NewsfeedList } from "./modules/newsfeed/list.component";
import { OAuth2 } from "./common/services/api/oauth2";

//for testing onboarding
import { OnboardingComponent } from './modules/onboarding/onboarding.component';

@Component({
  selector: "ion-app",
  templateUrl: "app.component.html",
  ////styleUrls: ['app.component.css']
})

export class MindsApp {

  @ViewChild(Nav) nav: Nav;

  components = {
    group: GroupProfile
  };

  rootPage : any = LoginComponent;

  constructor(private oauth2 : OAuth2, public menuCtrl: MenuController, private platform : Platform){
    platform.ready().then(() => {
      StatusBar.backgroundColorByHexString('#333333');
    });
    if(this.oauth2.hasAccessToken()){
      this.rootPage = TabsComponent;
      //this.rootPage = OnboardingComponent;
    }
  }

  ngOnInit(){

  }

  openBugGroup(){
    this.nav.push(GroupProfile, {guid:'100000000000000681'});
    this.menuCtrl.close();
  }

  logout(){
    (<any>window).localStorage.clear();
    this.nav.push(LoginComponent);
    (<any>window).location.reload();
  }

}
