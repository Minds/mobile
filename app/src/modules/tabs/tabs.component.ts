import {Component} from "@angular/core";
import { Location } from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Page } from 'ui/page';

@Component({
  moduleId: module.id,
  selector: "minds-tabs",
  templateUrl: "tabs.component.html"
})

export class TabsComponent {

  selectedIndex = 0;

  constructor(page : Page, private route: ActivatedRoute, private router : Router, private location: Location){
    //page.actionBarHidden = true;
  }

  //Yikes: talk about a hack!

  ngOnInit(){

    this.route.params.subscribe(params => {
      //console.log('tab should be ' + params['id']);
      switch(params['id']){
        case 'newsfeed':
          this.selectedIndex = 0;
          break;
        case 'discovery':
          this.selectedIndex = 1;
          break;
        case 'messenger':
          this.selectedIndex = 2;
          break;
        case 'notifications':
          this.selectedIndex = 3;
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
        break;
      default:
        this.location.replaceState('/tab/default');
    }

  }
}
