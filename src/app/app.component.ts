import { Component, ViewChild } from "@angular/core";
import { Nav, MenuController, Platform, App } from 'ionic-angular';
import { StatusBar, AppVersion } from 'ionic-native';

import { TabsComponent } from "./modules/tabs/tabs.component";
import { LoginComponent } from "./modules/auth/login.component";
import { GroupProfile } from './modules/groups/profile.component';
import { GroupsList } from './modules/groups/list.component';
import { BlogsList } from './modules/blog/list.component';
import { NewsfeedList } from "./modules/newsfeed/list.component";
import { OAuth2 } from "./common/services/api/oauth2";
import { Storage } from "./common/services/storage";
import { PushService } from './modules/push/push.service';

//for testing onboarding
import { OnboardingComponent } from './modules/onboarding/onboarding.component';

@Component({
  selector: "ion-app",
  templateUrl: "app.component.html",
  ////styleUrls: ['app.component.css']
})

export class MindsApp {

  components = {
    group: GroupProfile,
    blogs: BlogsList
  };

  versionNumber : string = "...";
  versionCode : string = "...";

  rootPage : any = LoginComponent;

  constructor(private oauth2 : OAuth2, public menuCtrl: MenuController, private platform : Platform, private app : App,
    private storage : Storage, private push : PushService){
    platform.ready().then(() => {
      StatusBar.backgroundColorByHexString('#37474f');
    });
    if(this.oauth2.hasAccessToken()){
      this.rootPage = TabsComponent;
      //this.rootPage = OnboardingComponent;
    }
  }

  ngOnInit(){
    this.platform.ready().then(() => {
      AppVersion.getVersionNumber()
        .then((version) => {
          this.versionNumber = version;
        });
      AppVersion.getVersionCode()
        .then((code) => {
          this.versionCode = code;
      });
    });
  }

  openBlogs(filter : string){
    this.app.getRootNav().push(BlogsList, { filter: filter });
    this.menuCtrl.close();
  }

  openGroups(){
    this.app.getRootNav().push(GroupsList);
    this.menuCtrl.close();
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
