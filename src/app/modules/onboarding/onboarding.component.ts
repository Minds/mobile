import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';

import { TabsComponent } from '../tabs/tabs.component';
import { OAuth2 } from '../../common/services/api/oauth2';

@Component({
  moduleId: 'module.id',
  selector: 'onboarding',
  templateUrl: 'onboarding.component.html',
  //styleUrls: ['login.component.css']
})

export class OnboardingComponent {

  steps : Array<any> = [
    'categories'
  ];

  step : number = 0;

  constructor(private oauth2 : OAuth2, private nav : NavController, public loadingCtrl: LoadingController, private alertCtrl: AlertController){
  }

  ngOnInit(){

  }

  nextStep(){
    if(this.step++ >= this.steps.length-1){
      this.nav.setRoot(TabsComponent);
    }
  }

}
