import { Component, ElementRef, Input, Output, EventEmitter, OnChanges, HostListener } from "@angular/core";
import { Platform } from 'ionic-angular';

@Component({
	selector: 'm-mature',
	templateUrl: 'mature.component.html'
})
export class MatureComponent {

  constructor(private platform : Platform) {
  }

  @Input() mature;
  @Output('show') show = new EventEmitter(true);

  @HostListener('click', ['$event'])
  toggle(e) {
    if (this.platform.is('ios'))
      return;

    if(this.mature){
      e.stopPropagation();
      e.preventDefault();
      this.mature = false;
    } else {
      this.mature = true;
    }

    this.show.next(this.mature);
  }

}
