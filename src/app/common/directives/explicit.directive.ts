import { Directive, ElementRef, Input, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
  selector: '[explicit]'
})

export class ExplicitDirective {

  isExplicit : boolean = true;
  wasExplicit : boolean = false;
  @Output('showExplicit') removeExplicit : EventEmitter<any> = new EventEmitter();

  constructor(private el: ElementRef) {

  }

  @Input() set explicit(explicit : boolean){
    if(explicit){
      this.markExplicit();
    } else {
      if(this.isExplicit && !this.wasExplicit){
        this.unmarkExplicit();
      }
    }
  }

  markExplicit(){
    this.isExplicit = true;
    this.wasExplicit = false;
    this.el.nativeElement.classList.add('m-ionic-explicit--blur');
    this.el.nativeElement.classList.remove('m-ionic-explicit--blur--removed');
  }

  unmarkExplicit(){
    this.isExplicit = false;
    this.wasExplicit = true;
    this.el.nativeElement.classList.remove('m-ionic-explicit--blur');
    this.el.nativeElement.classList.add('m-ionic-explicit--blur--removed');
  }

  @HostListener('click', ['$event'])
  show(e){
    if(this.isExplicit){
      this.removeExplicit.next(true);
      this.wasExplicit = true;
      e.preventDefault();
      return;
    }
    if(this.wasExplicit){
      //this.removeExplicit.next(false);
    }
  }

}
