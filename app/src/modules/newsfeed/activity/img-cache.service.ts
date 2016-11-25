import * as observable from "data/observable";
import * as imageCache from "ui/image-cache";
import * as imageSource from "image-source";

var cache = new imageCache.Cache();
cache.maxRequests = 10;
//cache.placeholder = imageSource.fromFile("~/src/assets/full_logo.png");
cache.placeholder = null;

export class ImageItem extends observable.Observable
{
  private _imageSrc: string

  constructor(imageSrc : string){
      super();
      this._imageSrc = imageSrc;
  }

  get imageSrc(): imageSource.ImageSource {

      console.log('getting new image');

      var image = cache.get(this._imageSrc);

      if (image){
          console.log('already got a cached image');
          return image;
      }

      cache.push({
        key: this._imageSrc,
        url: this._imageSrc,
        completed: (image) => {
          console.log('got a new image');
          this.notify(
              {
                object: this,
                eventName: observable.Observable.propertyChangeEvent,
                propertyName: "imageSrc",
                value: image
              });
          }
        });

      return cache.placeholder;
  }


}
