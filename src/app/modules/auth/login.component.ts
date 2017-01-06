import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController } from 'ionic-angular';


import { TabsComponent } from '../tabs/tabs.component';
import { OAuth2 } from '../../common/services/api/oauth2';

@Component({
  moduleId: 'module.id',
  selector: 'login',
  templateUrl: 'login.component.html',
  //styleUrls: ['login.component.css']
})

export class LoginComponent {

  constructor(private oauth2 : OAuth2, private nav : NavController){
  }

  ngOnInit(){
    if(this.oauth2.hasAccessToken()){
      this.nav.setRoot(TabsComponent);
    }
  }

  login(username, password, e){
    e.preventDefault();
    console.log('clicked login');
    console.log('username: ', username.value);
    console.log('password: ', password.value);
    this.oauth2.login(username.value, password.value, (success) => {
      console.log('login callback called');
      console.log(success);
      if(success){
        this.nav.push(TabsComponent);
      } else {
        alert('Please try again');
      }
    });
    //this.routerExtensions.navigate(['/tab/newsfeed'], { clearHistory: true });
  }

}
