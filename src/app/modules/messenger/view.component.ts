import { Component, OnInit, OnDestroy, Input, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Content, NavParams, NavController, ActionSheetController, AlertController, LoadingController } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';

import { ChannelComponent } from '../channel/channel.component';
import { Client } from '../../common/services/api/client';
import { Storage } from '../../common/services/storage';

import { MessengerViewService } from './view.service';

import { CONFIG } from '../../config';
import { SocketsService } from "../../common/services/api/sockets.service";

@Component({
  moduleId: 'module.id',
  selector: 'messenger-view',
  templateUrl: 'view.component.html',
  //styleUrls: ['list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MessengerView implements OnInit, OnDestroy {


  @ViewChild('scrollArea') scrollArea: Content;
  @Input() conversation: any;

  inProgress: boolean = false;
  offset: string = "";
  messages: Array<any> = [];
  publickeys: any = {};

  keyboardListener;

  message: string = "";

  minds = {
    cdn_url: CONFIG.cdnUrl
  }

  components = {
    channel: ChannelComponent
  }

  live: boolean = true;
  blocked: boolean = false;
  invalid: boolean = false;


  constructor(private client: Client, private cd: ChangeDetectorRef, private params: NavParams,
    private service: MessengerViewService, private storage: Storage, private sockets: SocketsService,
    private actionSheetCtrl : ActionSheetController, private navCtrl : NavController, private alertCtrl : AlertController,
    private loadingCtrl: LoadingController, private keyboard: Keyboard){}

  ngOnInit() {
    this.conversation = this.params.get('conversation');

    this.service.setGuid(this.conversation.guid);
    setTimeout(() => {
      this.load()
        .then(() => {
          this.listen();
        });
    }, 300);

    this.keyboardListener = this.keyboard.onKeyboardShow();
    this.keyboardListener.subscribe(() => {
      this.scrollArea.scrollToBottom();
    });
  }

  ngOnDestroy() {
    this.unListen();
  }

  load(opts = { finish: '' }) {

    this.inProgress = true;
    this.conversation.unread = false;

    let offset = "";
    let limit = 12;

    if (opts.finish) {
      offset = opts.finish;
      limit = 1;
    }
    else if (this.messages.length > 0) {
      offset = this.messages[0].guid;
    }

    return this.service.getFromRemote(limit, offset)
      .then((messages: Array<any>) => {
        this.inProgress = false;

        if (offset && limit > 1) {
          messages.shift();
        }

        if (opts.finish) {
          this.messages.push(...messages);
        } else {
          this.messages = messages.concat(this.messages);
        }

        this.cd.markForCheck();
        this.cd.detectChanges();

        if (!offset || opts.finish) {
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

  loadEarlier(puller) {
    puller.complete();
    this.load();
  }

  send(e) {
    e.preventDefault();

    this.messages.push({
      guid: '',
      message: this.message,
      decrypted: true,
      owner: {
        guid: this.storage.get('user_guid')
      },
      time_created: Date.now() / 1000
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

      for (let guid in this.service.publickeys) {

        (<any>window).Crypt.setPublicKey(this.service.publickeys[guid]);

        (<any>window).Crypt.encrypt(message, (success) => {

          encrypted[guid] = success;
          if (Object.keys(encrypted).length == Object.keys(this.service.publickeys).length) {
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

  socketSubscriptions = {
    pushConversationMessage: null,
    clearConversation: null,
    connect: null,
    disconnect: null,
    block: null,
    unblock: null
  }

  listen() {
    if (this.conversation.socketRoomName) {

      this.sockets.join(this.conversation.socketRoomName);

      this.socketSubscriptions.pushConversationMessage = this.sockets.subscribe('pushConversationMessage', (guid, message) => {
        if (guid != this.conversation.guid) {
          return;
        }

        let fromSelf = false;

        if (this.storage.get('user_guid') == message.ownerObj.guid) {
          fromSelf = true;
        }

        if (!fromSelf) {
          this.load({ finish: message.guid });
          this.invalid = false;
          // @todo: play sound and notify user
        }
      });

      this.socketSubscriptions.clearConversation = this.sockets.subscribe('clearConversation', (guid, actor) => {
        if (guid != this.conversation.guid) {
          return;
        }

        this.messages = [];
        // @todo: notify user that the history was cleared
        this.invalid = false;
      });

      this.socketSubscriptions.block = this.sockets.subscribe('block', (guid) => {
        if (!this.hasParticipant(guid)) {
          return;
        }

        this.blocked = true;
        // @todo: handle blocking
      });

      this.socketSubscriptions.unblock = this.sockets.subscribe('unblock', (guid) => {
        if (!this.hasParticipant(guid)) {
          return;
        }

        this.blocked = false;
        // @todo: handle unblocking
      });

      this.socketSubscriptions.connect = this.sockets.subscribe('connect', () => {
        this.live = true;
        // @todo: handle connecting to server (or delete this and its object key from socketSubscriptions)
      });

      this.socketSubscriptions.disconnect = this.sockets.subscribe('disconnect', () => {
        this.live = false;
        // @todo: handle disconnecting from server (or delete this and its object key from socketSubscriptions)
      });
    }
  }

  unListen() {
    if (this.conversation.socketRoomName) {
      this.sockets.leave(this.conversation.socketRoomName);
    }

    for (let sub in this.socketSubscriptions) {
      if (this.socketSubscriptions[sub]) {
        this.socketSubscriptions[sub].unsubscribe();
      }
    }
  }

  private hasParticipant(guid: string) {
    if (!this.conversation || !this.conversation.participants) {
      return false;
    }

    let has = false;

    this.conversation.participants.forEach((participant: any) => {
      if (participant.guid == guid) {
        has = true;
      }
    });

    return has;
  }

  openChatOptions() {
    let menuOptions = this.actionSheetCtrl.create({
      title: '',
      buttons: [
        {
          text: 'Delete',
          icon: 'trash',
          role: 'destructive',
          handler: () => {
            this.showChatDeleteAlert();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {}
        }
      ]
    });

    menuOptions.present();
  }

  private deleteChat() {
    let loading = this.loadingCtrl.create({
      content: 'Deleting...'
    });

    loading.present();

    this.client.delete('api/v2/conversations/' + this.conversation.guid, {})
      .then(() => {
        loading.dismiss();
        this.navCtrl.pop();
      })
  }

  showChatDeleteAlert() {
    let alert = this.alertCtrl.create({
      title: 'Are you sure?',
      message: 'All messages will be deleted for all parties. You cannot UNDO this action.',
      buttons: [
        {
          text: 'No',
          role: 'destructive',
          handler: () => {}
        },
        {
          text: 'Yes',
          handler: () => {
            this.deleteChat();
          }
        }
      ]
    });
    alert.present();
  }
}
