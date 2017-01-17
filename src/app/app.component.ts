import { Component, ViewChild } from "@angular/core";
import { Nav } from 'ionic-angular';

import { TabsComponent } from "./modules/tabs/tabs.component";
import { LoginComponent } from "./modules/auth/login.component";
import { NewsfeedList } from "./modules/newsfeed/list.component";
import { OAuth2 } from "./common/services/api/oauth2";

@Component({
  selector: "ion-app",
  templateUrl: "app.component.html",
  ////styleUrls: ['app.component.css']
})

export class MindsApp {

  @ViewChild(Nav) nav: Nav;

  rootPage : any = LoginComponent;

  constructor(private oauth2 : OAuth2){
    if(this.oauth2.hasAccessToken()){
      this.rootPage = TabsComponent;
    }
  }

  ngOnInit(){

  }

  logout(){
    (<any>window).localStorage.clear();
    this.nav.push(LoginComponent);
    (<any>window).location.reload();
  }

}
