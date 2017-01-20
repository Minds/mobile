import { Component, ChangeDetectionStrategy } from "@angular/core";
import { Storage } from '../../common/services/storage';
import { ChannelComponent } from '../channel/channel.component';

@Component({
  moduleId: 'module.id',
  selector: "m-header",
  templateUrl: "header.component.html",
  //styleUrls: [ 'tabs.component.css' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HeaderComponent {

  storage = new Storage();

  components = {
    channel : ChannelComponent
  }

  constructor(){
  }

}
