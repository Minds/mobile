import { Component, OnInit, OnDestroy, Input, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Content, NavParams } from 'ionic-angular';
import { Keyboard } from 'ionic-native';

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
  publickeys : any = {};

  keyboardListener;

  message : string = "";

  components = {
    channel: ChannelComponent
  }

  constructor(private client : Client, private cd : ChangeDetectorRef, private params: NavParams,
    private service : MessengerViewService, private storage : Storage){}

  ngOnInit(){
    this.conversation = this.params.get('conversation');
    this.service.setGuid(this.conversation.guid);
    setTimeout(() => {
      this.load();
    }, 300);

    this.keyboardListener = Keyboard.onKeyboardShow();
    this.keyboardListener.subscribe(() => {
      this.scrollArea.scrollToBottom();
    });
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

  send(e){
    e.preventDefault();

    this.messages.push({
      guid: '',
      message: this.message,
      decrypted: true,
      owner: {
        guid: this.storage.get('user_guid')
      },
      time_created: Date.now()
    });

    let message = this.message;
    this.message = "";

    this.cd.markForCheck();
    this.cd.detectChanges();

    this.scrollArea.scrollToBottom();
    setTimeout(() => {
      this.scrollArea.scrollToBottom();
    }, 300);

    let encrypted = {};

    let encrypt = new Promise((resolve, reject) => {

      for(let guid in this.service.publickeys){

        (<any>window).Crypt.setPublicKey(this.service.publickeys[guid]);

        (<any>window).Crypt.encrypt(message, (success) => {

          encrypted[guid] = success;
          if(Object.keys(encrypted).length == Object.keys(this.service.publickeys).length){
            resolve(true);
          }
        });
      }
    });

    encrypt.then(() => {

      let data = {};
      for (var index in encrypted) {
				data["message:" + index] = encrypted[index];
			}

      this.client.post('api/v2/conversations/' + this.conversation.guid, data)
        .then(() => {
        })
    })

  }


}
