import { Component, ChangeDetectionStrategy, Input } from "@angular/core";
import { NavController } from 'ionic-angular';
import { Storage } from '../../common/services/storage';
import { ChannelComponent } from '../channel/channel.component';

import { CONFIG } from '../../config';

@Component({
  moduleId: 'module.id',
  selector: "m-header",
  templateUrl: "header.component.html",
  //styleUrls: [ 'tabs.component.css' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HeaderComponent {

  components = {
    channel : ChannelComponent
  }

  minds = {
    cdn_url: CONFIG.cdnUrl
  }

  @Input() showNavbar : boolean = true;

  constructor(private storage : Storage, private navCtrl : NavController){
  }

}
