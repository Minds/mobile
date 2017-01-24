import { Component, ElementRef, Input, Output, EventEmitter, ViewChild, OnChanges, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'm-textarea',
  template: `
    <div
      #editor
      class="m-editor"
      [class.m-editor-disabled]="disabled "
      [attr.contenteditable]="!disabled ? 'true' : null"
      (keyup)="change()"
      (blur)="change()"
      (paste)="change()"
    ></div>
    <span
      *ngIf="placeholder && editor.innerText.length === 0"
      class="m-placeholder"
    >{{ placeholder }}</span>
  `
})

export class TextareaComponent implements OnChanges {

  @ViewChild('editor') editorControl: ElementRef;

  @Input() placeholder : string = '';
  @Input('mModel') model : string = '';
  @Output('mModelChange') update : EventEmitter<any> = new EventEmitter();

  disabled : boolean = false;


  constructor(el: ElementRef, private cd : ChangeDetectorRef) {

  }

  focus() {
    this.editorControl.nativeElement.focus();
  }

  blur() {
    this.editorControl.nativeElement.blur();
  }

  change() {
    this.model = this.editorControl.nativeElement.innerText;
    this.update.emit(this.editorControl.nativeElement.innerText);
  }

  @Input() set clear(value : any){
    this.blur();
    this.model = this.editorControl.nativeElement.innerText = '';
  }

  ngOnChanges(changes: any) {
    if(changes.model && this.editorControl.nativeElement.innerText !== changes.model.currentValue
      && (changes.model.isFirstChange() || changes.model.previousValue !== changes.model.currentValue)
    ) {
      this.editorControl.nativeElement.innerText = this.model;

      if(!this.model){
        this.blur();
      }
    }

    if (changes.disabled && changes.disabled.currentValue) {
      this.blur();
    }

    this.cd.markForCheck();
    this.cd.detectChanges();
  }

}
