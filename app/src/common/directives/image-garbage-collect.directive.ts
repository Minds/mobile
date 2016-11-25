import { Directive,  ElementRef } from '@angular/core';
import {Image} from "ui/image";

@Directive({
  selector: 'image-garbage-collect',
})

export class ImageGarbageCollectDirective {

  image : Image;

  constructor(element: ElementRef){
    this.image = element.nativeElement;
  }

  onDestroy(){
    console.log('destroying');
    if(this.image && this.image.android) {
      let drawable = this.image.android.getDrawable();
      if(drawable) {
        drawable.getBitmap().recycle();
      }
    }
  }

}
