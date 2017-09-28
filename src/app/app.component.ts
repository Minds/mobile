import { Component, ViewChild } from "@angular/core";
import { Nav, MenuController, Platform, App } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';
import { AppVersion } from '@ionic-native/app-version';

import { TabsComponent } from "./modules/tabs/tabs.component";
import { LoginComponent } from "./modules/auth/login.component";
import { GroupProfile } from './modules/groups/profile.component';
import { GroupsList } from './modules/groups/list.component';
import { BlogsList } from './modules/blog/list.component';
import { NewsfeedList } from "./modules/newsfeed/list.component";
import { OAuth2 } from "./common/services/api/oauth2";
import { Client } from './common/services/api/client';
import { Storage } from "./common/services/storage";
import { PushService } from './modules/push/push.service';
import { ShareService } from './modules/share/share.service';
import { SocketsService } from './common/services/api/sockets.service'
import { SettingsComponent } from './modules/settings/settings.component';
import { AttachmentService } from "./modules/attachments/attachment.service";

//for testing onboarding
import { OnboardingComponent } from './modules/onboarding/onboarding.component';
import { AppStatusService } from "./common/services/app-status.service";
import { CurrentUserService } from "./common/services/current-user.service";
import { PaymentsService } from "./common/services/payments.service";

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
    private storage : Storage, private push : PushService, private share : ShareService, private sockets: SocketsService,
    private client : Client, private appStatus: AppStatusService,
    private statusBar: StatusBar, private splashScreen: SplashScreen, private keyboard: Keyboard, private appVersion: AppVersion,
    private attachment: AttachmentService, private currentUser: CurrentUserService, private payments: PaymentsService) {

    if(this.oauth2.hasAccessToken()){
      this.rootPage = TabsComponent;
      //this.rootPage = OnboardingComponent;
    }
  }

  ngOnInit(){
    this.platform.ready().then(() => {
      this.statusBar.backgroundColorByHexString('#37474f');
      //Keyboard.disableScroll(true);
      this.splashScreen.hide();
      this.setDefaultSettings();
      this.sockets.reconnect();
      this.appVersion.getVersionNumber()
        .then((version) => {
          this.versionNumber = version;
        });
      this.appVersion.getVersionCode()
        .then((code) => {
          this.versionCode = code;
      });

      this.appStatus.setUp();
      this.currentUser.fetch();

      this.payments.setUp();
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

  openSettings(){
    this.app.getRootNav().push(SettingsComponent);
    this.menuCtrl.close();
  }

  logout() {
    this.attachment.reset();
    this.sockets.deregister();
    this.client.post('api/v1/logout');
    this.currentUser.destroy();
    (<any>window).localStorage.clear();
    this.menuCtrl.close();
    this.app.getRootNav().setRoot(LoginComponent);
    //(<any>window).location.reload();
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
