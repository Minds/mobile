import * as imageCache from "ui/image-cache";
import * as imageSource from "image-source";
import { Observable } from 'rxjs/Rx';
import { Pipe } from '@angular/core';
import * as applicationModule from "application";

var cache = new imageCache.Cache();
//cache.maxRequests = 10;
//cache.placeholder = imageSource.fromFile("~/src/assets/full_logo.png");

@Pipe({
  name: 'imageCache',
})

export class ImageCachePipe {

  transform(src : string){

    var image = cache.get(src);

    if (image){
      return image;
    }

    //android doesn't like it!
    if (applicationModule.android){
      return cache.placeholder;
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
