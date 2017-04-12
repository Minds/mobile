import { Component, ElementRef, Input, Output, EventEmitter, ViewChild, OnChanges, ChangeDetectorRef } from '@angular/core';
import { SuggestionsList } from '../../modules/suggestions/suggestions.component';

@Component({
  selector: 'm-textarea',
  templateUrl: 'textarea.component.html',
  exportAs: 'Textarea'
})

export class TextareaComponent implements OnChanges {

  @ViewChild('editor') editorControl: ElementRef;
  @ViewChild('suggestionsList') suggestionsList: SuggestionsList;

  @Input() placeholder : string = '';
  @Input('mModel') model : string = '';
  @Output('mModelChange') update : EventEmitter<any> = new EventEmitter();

  @Input() disableBlur : boolean = false;

  disabled : boolean = false;

  constructor(el: ElementRef, private cd : ChangeDetectorRef) {}

  @Input('autofocus') set autofocus(value : boolean){
    //alert('autofocusing');
    //if(value)
    setTimeout(() => {
      this.editorControl.nativeElement.focus();
    }, 300);
  }

  focus() {
    this.editorControl.nativeElement.focus();
    this._placeCaretAtEnd(this.editorControl.nativeElement);
  }

  blur() {
    if(!this.disableBlur)
      this.editorControl.nativeElement.blur();
  }

  change(event) {
    if(!event){
      this._placeCaretAtEnd(this.editorControl.nativeElement);  
    } else {
      this.model = this.editorControl.nativeElement.innerText;
      this.update.emit(this.editorControl.nativeElement.innerText);
    }
  }

  getSuggestionsList(event){
    let sel = window.getSelection();
    let search = this.model.substring(0, sel.anchorOffset);
    this.suggestionsList.searchSuggestions(search, event);
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

    this.detectChanges();
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

  private _placeCaretAtEnd(el: HTMLElement) {
    if (typeof window.getSelection != "undefined" && typeof document.createRange != "undefined") {
      var range = document.createRange();
      range.selectNodeContents(el);
      range.collapse(false);
      var sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    } else if (typeof (<any>document.body).createTextRange != "undefined") {
      var textRange = (<any>document.body).createTextRange();
      textRange.moveToElementText(el);
      textRange.collapse(false);
      textRange.select();
    }
  }

  private detectChanges() {
    this.cd.markForCheck();
    this.cd.detectChanges();
  }
}
