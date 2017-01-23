import { Component, OnInit, OnDestroy, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NavParams } from 'ionic-angular';

import { ChannelComponent } from '../channel/channel.component';
import { Client } from '../../common/services/api/client';
import { Storage } from '../../common/services/storage';

@Component({
  moduleId: 'module.id',
  selector: 'messenger-view',
  templateUrl: 'view.component.html',
  //styleUrls: ['list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MessengerView {

  @Input() conversation : any;

  inProgress : boolean = false;
  offset : string = "";
  messages : Array<any> = [];

  message : string = "";

  components = {
    channel: ChannelComponent
  }

  storage = new Storage();

  constructor(private client : Client, private cd : ChangeDetectorRef, private params: NavParams ){}

  ngOnInit(){
    this.conversation = this.params.get('conversation');
    this.load();
  }

  load(){
    this.inProgress = true;
    this.client.get('api/v2/conversations/' + this.conversation.guid)
      .then((response : any) => {
        this.inProgress = false;
        if(!response.messages){
          return false;
        }

        //if (opts.finish) {
        //  this.messages = this.messages.concat(response.messages);
        //  this.scrollEmitter.next(true);
        //} else if(opts.offset){
        //  let scrollTop = scrollView.scrollTop;
        //  let scrollHeight = scrollView.scrollHeight;
        //  response.messages.shift();
        //  this.messages = response.messages.concat(this.messages);
        //  this.offset = response['load-previous'];
        //  setTimeout(() => {
        //    scrollView.scrollTop = scrollTop + scrollView.scrollHeight - scrollHeight +60;
        //  });
      //} else {
          this.messages = response.messages;
          this.offset = response['load-previous'];
        //}

        this.cd.markForCheck();
        this.cd.detectChanges();

        //this.blocked = !!response.blocked;
        //this.unavailable = !!response.unavailable;
      })
      .catch(() => {
        this.inProgress = false;
      });
  }

  loadEarlier(puller){
    puller.complete();
    this.load();
  }

  send(){

  }


}
