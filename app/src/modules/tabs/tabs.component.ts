import { Component, ChangeDection, ChangeDetectionStrategy } from "@angular/core";
import { Location } from '@angular/common';
import { Router, ActivatedRoute, Params, NavigationEnd } from '@angular/router';
import { Page } from 'ui/page';
import * as applicationModule from "application";

@Component({
  moduleId: module.id,
  selector: "minds-tabs",
  templateUrl: "tabs.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TabsComponent {

  selectedIndex = 0;
  initializedRoutes = {};

  android = applicationModule.android;

  constructor(page : Page, private route: ActivatedRoute, private router : Router, private location: Location){
    page.actionBarHidden = true;
  }

  //Yikes: talk about a hack!

  ngOnInit(){

    this.router.events.subscribe(state => {
      if (!state instanceof NavigationEnd) {
        return;
      }
      console.log('tab should be ' + state.urlAfterRedirects);
      switch(state.urlAfterRedirects){
        case '/tab/newsfeed':
          this.selectedIndex = 0;
          break;
        case '/tab/discovery':
          this.selectedIndex = 1;
          break;
        case '/tab/messenger':
          this.selectedIndex = 2;
          break;
        case '/tab/notifications':
          this.selectedIndex = 3;
          break;
        case '/tab/channel':
          this.selectedIndex = 4;
          break;
      }
    });
  }

  changedIndex(index){
    this.selectedIndex = index;
    console.log('changed to ' + index);
    switch(index){
      case 0:
        this.router.navigate(['/tab/newsfeed']);
        break;
      case 1:
        this.router.navigate(['/tab/discovery']);
        break;
      case 2:
        this.router.navigate(['/tab/messenger']);
        break;
      case 3:
        this.router.navigate(['/tab/notifications']);
        this.initializedRoutes['/tab/notifications'] = true;
        break;
      case 4:
        this.router.navigate(['/tab/channel']);
        this.initializedRoutes['/tab/channel'] = true;
        break;
      default:
        this.location.replaceState('/tab/default');
    }

  }
}
