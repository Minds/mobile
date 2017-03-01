import { Component, ElementRef, Input, Output, EventEmitter, OnChanges } from "@angular/core";
import { Client } from '../services/api/client';

@Component({
	selector: 'm-rich-input',
	templateUrl: 'rich-input.component.html'
})
export class RichInputComponent {


	@Output('richInputMeta') output = new EventEmitter();

	previewTimeout;
	meta : any = {};

	constructor(private client : Client) {
	}

	@Input('richInput') set input(input : string){
		this.getPreview(input);
	}

	getPreview(input : string){

		if(!input){
			this.clear();
			return;
		}

    let match = input.match(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig);
    let url;

    if(!match)
      return;

    if(match instanceof Array){
      url = match[0];
    } else {
      url = match;
    }

    if(!url.length)
      return;

    //if(url == this.attachment.richUrl)
    //  return;

    this.meta.is_rich = 1;

    if(this.previewTimeout)
      clearTimeout(this.previewTimeout);

    this.meta.url = url;

    this.previewTimeout = (<any>window).setTimeout(() => {
      this.clear();
      this.meta.is_rich = 1;

      this.client.get('api/v1/newsfeed/preview', { url })
      .then((data: any) => {

        if(!data){
          this.clear();
          return;
        }

        if(data.meta){
          this.meta.url = data.meta.canonical || url;
          this.meta.title = data.meta.title || this.meta.url;
          this.meta.description = data.meta.description || '';
        } else {
          this.meta.url = url;
          this.meta.title = url;
        }

        if (data.links && data.links.thumbnail && data.links.thumbnail[0]) {
          this.meta.thumbnail = data.links.thumbnail[0].href;
        }

				this.output.next(this.meta);
      })
      .catch(e => {
        this.clear();
      });
    }, 600);
	}

	clear(){
		this.meta = {};
	}
}
