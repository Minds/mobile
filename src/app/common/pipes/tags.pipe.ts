import { Pipe, Inject, Renderer }  from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NavController } from 'ionic-angular';

import { ChannelComponent } from '../../modules/channel/channel.component';
import { BlogView } from '../../modules/blog/view.component';
import { NewsfeedSingleComponent } from '../../modules/newsfeed/single.component';
import { GroupProfile } from '../../modules/groups/profile.component';

import { DiscoveryList } from "../../modules/discovery/list.component";

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
    value = value.replace(url, '<a href="javascript:window.urlPress(\'$1\');">$1</a>');

    // <a>tag w/o protocol, but common TLD
    var url = /(^|\s+)([-A-Z0-9+&@#\/%?=~_|!:,.;]+\.(com|org|net)\/[-A-Z0-9+&@#\/%=~_|]*)/gim;
    value = value.replace(url, ' <a href="javascript:window.urlPress(\'$2\');">$2</a>');

    // <a>tag w/o protocol, but www prefix
    var url = /(^|\s+)(www\.[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|]*)/gim;
    value = value.replace(url, ' <a href="javascript:window.urlPress(\'$2\');">$2</a>');

    //#hashtag
    var hash = /(^|\s)#(\w*[a-zA-Z_]+\w*)/gim;
    value = value.replace(hash, '$1<a href="javascript:window.hashtagPress(\'#$2\');">#$2</a>');

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
    //TODO: move this to a proper service
    (<any>window).hashtagPress = (hashtag) => {
      this.navCtrl.push(DiscoveryList, {q: hashtag});
    };
    (<any>window).urlPress = (url) => {

      if(url.indexOf('minds.com/blog/view') > -1){
        let parts = url.split('/');
        this.navCtrl.push(BlogView, { guid: parts[parts.length-1]});
        return;
      }
      if(url.indexOf('minds.com/newsfeed/') > -1){
        let parts = url.split('/');
        this.navCtrl.push(NewsfeedSingleComponent, { guid: parts[parts.length-1]});
        return;
      }
      if(url.indexOf('minds.com/groups/profile') > -1){
        let parts = url.split('/');
        let guid = parts[parts.length-1];
        if(guid.length != 18)
          guid = parts[parts.length-2]

        this.navCtrl.push(GroupProfile, { guid: guid });
        return;
      }

      (<any>window).open(url, "_system");
    };

    return value;

  }


}
