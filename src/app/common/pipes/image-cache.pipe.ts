import { Observable } from 'rxjs/Rx';
import { Pipe } from '@angular/core';


@Pipe({
  name: 'imageCache',
})

export class ImageCachePipe {

  transform(src : string){

    return src;

  }

}
