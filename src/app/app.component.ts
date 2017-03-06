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
import { ShareService } from './modules/share/share.service';
import { SocketsService } from './common/services/api/sockets.service'

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
    private storage : Storage, private push : PushService, private share : ShareService, private sockets: SocketsService){
    platform.ready().then(() => {
      StatusBar.backgroundColorByHexString('#37474f');
    });

    this.setDefaultSettings();

    if(this.oauth2.hasAccessToken()){
      this.rootPage = TabsComponent;
      this.sockets.reconnect();
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

  openGroups(filter: string) {
    this.app.getRootNav().push(GroupsList, { filter: filter });
    this.menuCtrl.close();
  }

  openBugGroup(){
    this.app.getRootNav().push(GroupProfile, {guid:'100000000000000681'});
    this.menuCtrl.close();
  }

  invite(){
    this.share.share('Join me on Minds.com', 'Join me on Minds.com', null, 'https://www.minds.com/register?referrer=' + this.storage.get('user_guid'));
  }

  logout() {
    this.sockets.deregister();
    (<any>window).localStorage.clear();
    this.app.getRootNav().push(LoginComponent);
    (<any>window).location.reload();
  }

  setDefaultSettings() {
    const defaults = {
      autoplay: false,
      pointsAnimation: true,
    }

    for (var key in defaults) {
      if (this.storage.get(key) !== null) {
        continue;
      }

      this.storage.set(key, defaults[key]);
    }
  }
}
