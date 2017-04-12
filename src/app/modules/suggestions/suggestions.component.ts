import { Component, Input, Output, ChangeDetectionStrategy, ChangeDetectorRef, EventEmitter } from '@angular/core';
import { Client } from '../../common/services/api/client';
import { CONFIG } from '../../config';
@Component({
  moduleId: 'module.id',
  selector: 'suggestions-list',
  templateUrl: 'suggestions.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SuggestionsList {
  minds = {
    cdn_url: CONFIG.cdnUrl
  }

  keys = {
    space : '32',
    enter : '13',
    backspace: '8',
    at : '64'
  }

  regex = /@{1}([a-z]|[A-Z]|_|-|:)+$/gim;

  showResults : boolean = false;
  suggestionsList : Array<any> = [];
  search : string;

  constructor(private client : Client, private cd : ChangeDetectorRef){}

  @Input() text : string;

  @Output() selected = new EventEmitter();

  searchSuggestions(search, event){
    if(!event)
      return;

    if(event.keyCode == this.keys.enter)
      this.onSuggestionTap(null, this.suggestionsList[0].username);

    if(event.keyCode == this.keys.space)
      this.showResults = false;

    if(this.showResults && search.indexOf('@') == -1)
      this.showResults = false;

    let input = search.substr(window.getSelection().anchorOffset - 1, 1);
    if(input === "@" || this.showResults){
      this.showResults = true;
      search.replace(this.regex, (txt) => {
        if(txt.length > 0) {
          this.search = txt;
          this.client.get('api/v1/search/suggest', { q: txt })
            .then((response : any) => {
              this.suggestionsList = response.suggestions;
              this.detectChanges();
            })
        }
      });
    }
  }

  onSuggestionTap(event, suggestion){
    if(event)
      event.preventDefault();
    this.text = this.text.replace(this.search, "@" + suggestion);
    this.showResults = false;
    this.selected.emit(this.text);
    this.suggestionsList = [];
    this.detectChanges();
  }

  private detectChanges() {
    this.cd.markForCheck();
    this.cd.detectChanges();
  }
}
