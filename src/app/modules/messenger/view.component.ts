import { Component, OnInit, OnDestroy, Input, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Content, NavParams } from 'ionic-angular';

import { ChannelComponent } from '../channel/channel.component';
import { Client } from '../../common/services/api/client';
import { Storage } from '../../common/services/storage';

import { MessengerViewService } from './view.service';

@Component({
  moduleId: 'module.id',
  selector: 'messenger-view',
  templateUrl: 'view.component.html',
  //styleUrls: ['list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MessengerView {

  @ViewChild('scrollArea') scrollArea : Content;
  @Input() conversation : any;

  inProgress : boolean = false;
  offset : string = "";
  messages : Array<any> = [];

  message : string = "";

  components = {
    channel: ChannelComponent
  }

  storage = new Storage();

  constructor(private client : Client, private cd : ChangeDetectorRef, private params: NavParams,
    private service : MessengerViewService){}

  ngOnInit(){
    this.conversation = this.params.get('conversation');
    this.service.setGuid(this.conversation.guid);
    setTimeout(() => {
      this.load();
    }, 300);
  }

  load(){

    this.inProgress = true;

    let offset = "";
    if(this.messages.length > 0)
      offset = this.messages[0].guid;

    this.service.getFromRemote(12, offset)
      .then((messages : Array<any>) => {
        this.inProgress = false;

        if(offset){
          messages.shift();
        }

        this.messages = messages.concat(this.messages);

        this.cd.markForCheck();
        this.cd.detectChanges();

        if(!offset){
          this.scrollArea.scrollToBottom();
          setTimeout(() => {
            this.scrollArea.scrollToBottom();
          }, 1000);
        }
      })
      .catch(() => {
        //failure to get any messages
      })

  }

  loadEarlier(puller){
    puller.complete();
    this.load();
  }

  send(){

  }


}
