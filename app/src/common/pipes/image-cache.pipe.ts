import * as imageCache from "ui/image-cache";
import * as imageSource from "image-source";
import { Observable } from 'rxjs/Rx';
import { Pipe } from '@angular/core';
import * as applicationModule from "application";

var cache = new imageCache.Cache();
cache.maxRequests = 10;
//cache.placeholder = imageSource.fromFile("~/src/assets/full_logo.png");

@Pipe({
  name: 'imageCache',
})

export class ImageCachePipe {

  transform(src : string){

    //android doesn't like/need it!
    //if (applicationModule.android){
      return src;
    //}

    var image = cache.get(src);

    if (image){
      return image;
    }

    cache.push({
      key: src,
      url: src,
      completed: (image) => {
        //console.log('got a new image');
      }
    });

    return cache.placeholder;

  }

}
