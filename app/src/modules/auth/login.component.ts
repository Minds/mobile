import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterExtensions } from 'nativescript-angular/router';
import { Page } from "ui/page";
import * as appSettings from "application-settings";

import { OAuth2 } from '../../common/services/api/oauth2';

@Component({
  moduleId: module.id,
  selector: 'login',
  template: `
    <StackLayout style.verticalAlignment="center">
        <Image src="~/src/assets/full_logo.png" horizontalAlignment="center" class="m-auth-login-logo"></Image>
        <TextField #username col="1" hint="Username" ></TextField>
        <TextField #password hint="Password" secure="true"></TextField>
        <Button text="Login" (tap)="login(username, password)" class="submit-button"></Button>
    </StackLayout>
  `,
  styleUrls: ['login.component.css']
})

export class LoginComponent {

  constructor(private router : Router, private routerExtensions : RouterExtensions, page : Page, private oauth2 : OAuth2){
    page.actionBarHidden = true;
  }

  ngOnInit(){
    if(this.oauth2.hasAccessToken()){
      this.routerExtensions.navigate(['/tab/newsfeed'], { clearHistory: true });
    }
  }

  login(username, password){
    console.log('clicked login');
    console.log('username: ', username.text);
    console.log('password: ', password.text);
    this.oauth2.login(username.text, password.text, (success) => {
      console.log('login callback called');
      console.log(success);
      if(success){
        this.routerExtensions.navigate(['/tab/newsfeed'], { clearHistory: true });
      } else {
        alert('Please try again');
      }
    });
    //this.routerExtensions.navigate(['/tab/newsfeed'], { clearHistory: true });
  }

}
