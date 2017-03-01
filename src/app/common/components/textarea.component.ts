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
      (paste)="paste($event); change()"
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

  @Input() disableBlur : boolean = false;

  disabled : boolean = false;


  constructor(el: ElementRef, private cd : ChangeDetectorRef) {

  }

  @Input('autofocus') set autofocus(value : boolean){
    //alert('autofocusing');
    //if(value)
    setTimeout(() => {
      this.editorControl.nativeElement.focus();
    }, 300);
  }

  focus() {
    this.editorControl.nativeElement.focus();
  }

  blur() {
    if(!this.disableBlur)
      this.editorControl.nativeElement.blur();
  }

  change() {
    this.model = this.editorControl.nativeElement.innerText;
    this.update.emit(this.editorControl.nativeElement.innerText);
  }

  paste(e: any) {
    e.preventDefault();

    if (e.clipboardData && e.clipboardData.getData) {
      var text = e.clipboardData.getData("text/plain");
      document.execCommand("insertHTML", false, text);
    } else if ((<any> window).clipboardData && (<any> window).clipboardData.getData) {
      var text = (<any> window).clipboardData.getData("Text");
      this.insertTextAtCursor(text);
    }
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

  private insertTextAtCursor(text: string) {
    let sel, range, html;

    if (window.getSelection) {
      sel = window.getSelection();
      if (sel.getRangeAt && sel.rangeCount) {
        range = sel.getRangeAt(0);
        range.deleteContents();
        range.insertNode(document.createTextNode(text));
      }
    } else if ((<any>document).selection && (<any>document).selection.createRange) {
      (<any>document).selection.createRange().text = text;
    }
  }

}
