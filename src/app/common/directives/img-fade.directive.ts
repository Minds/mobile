import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[imgFade]'
})

export class ImgFadeDirective {

  constructor(el: ElementRef) {

    //el.nativeElement.cla = 0;
    el.nativeElement.addEventListener('load', () => {
      el.nativeElement.className += " m-imgFade--loaded";
    });

  }
}
