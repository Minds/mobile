import { Component, ChangeDetectionStrategy } from "@angular/core";
import { ModalController } from 'ionic-angular';

import { CaptureComponent } from '../capture/capture.component';
import { MessengerList } from "../messenger/list.component";
import { NewsfeedList } from "../newsfeed/list.component";
import { NotificationsList } from "../notifications/list.component";
import { DiscoveryList } from "../discovery/list.component";


@Component({
  moduleId: 'module.id',
  selector: "minds-tabs",
  templateUrl: "tabs.component.html",
  //styleUrls: [ 'tabs.component.css' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TabsComponent {

  selectedIndex = 0;

  tabs = {
    newsfeed: NewsfeedList,
    discovery: DiscoveryList,
    notifications: NotificationsList,
    messenger: MessengerList
  }


  constructor(private modalCtrl : ModalController){
  }

  openCapture(){
    this.modalCtrl.create(CaptureComponent)
      .present();
  }

}
