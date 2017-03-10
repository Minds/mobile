import { Pipe, Inject, Renderer }  from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NavController } from 'ionic-angular';

import { ChannelComponent } from '../../modules/channel/channel.component';

@Pipe({
  name: 'tags',
  pure: false
})

export class TagsPipe {

  constructor(private domSanitizer: DomSanitizer, private navCtrl : NavController) {
  }


  transform(value: string | any) {

    if(!value || typeof value !== "string")
      return value;

    //<a>tag w/ protocol
    var url = /(\b(https?|http|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
    value = value.replace(url, '<a href="$1" target="_blank">$1</a>');

    // <a>tag w/o protocol, but common TLD
    var url = /(^|\s+)([-A-Z0-9+&@#\/%?=~_|!:,.;]+\.(com|org|net)\/[-A-Z0-9+&@#\/%=~_|]*)/gim;
    value = value.replace(url, ' <a href="http://$2" target="_blank">$2</a>');

    // <a>tag w/o protocol, but www prefix
    var url = /(^|\s+)(www\.[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|]*)/gim;
    value = value.replace(url, ' <a href="http://$2" target="_blank">$2</a>');

    //#hashtag
    var hash = /(^|\s)#(\w*[a-zA-Z_]+\w*)/gim;
    value = value.replace(hash, '$1<a>#$2</a>');

    //@tag
    var at = /(^|\s)\@(\w*[a-zA-Z_]+\w*)/gim;
    value = value.replace(at, '$1<a class="tag" href="javascript:window.tagPress(\'$2\');" onclick="window.tagPress($2)" target="_blank">@$2</a>');
    //if(at && !hash && !url){
      value = this.domSanitizer.bypassSecurityTrustHtml(value);
    //}

    //TODO: move this to a proper service
    (<any>window).tagPress = (username) => {
      this.navCtrl.push(ChannelComponent, {guid: username});
    };

    return value;

  }


}
