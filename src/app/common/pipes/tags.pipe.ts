import { Pipe, Inject, Renderer }  from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Nav } from 'ionic-angular';

import { ChannelComponent } from '../../modules/channel/channel.component';

@Pipe({
  name: 'tags',
  pure: false
})

export class TagsPipe {

  constructor(private domSanitizer: DomSanitizer, private nav : Nav) {
  }


  transform(value: string | any) {

    if(!value || typeof value !== "string")
      return value;

    //<a>tag
    var url = /(\b(https?|http|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
    value = value.replace(url, '<a href="$1" target="_blank">$1</a>');

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
      this.nav.push(ChannelComponent, {guid: username});
    };

    return value;

  }


}
