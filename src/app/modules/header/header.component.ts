import { Component, ChangeDetectionStrategy } from "@angular/core";
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

  constructor(private storage : Storage){
  }

}
