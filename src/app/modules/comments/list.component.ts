import { Component, OnInit, OnDestroy, Input, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { NavParams, Content, ActionSheetController } from 'ionic-angular';

import { ChannelComponent } from '../channel/channel.component';
import { TextareaComponent } from "../../common/components/textarea.component";
import { Client } from '../../common/services/api/client';
import { Storage } from '../../common/services/storage';

import { CONFIG } from '../../config';
import { SocketsService } from "../../common/services/api/sockets.service";
import { AttachmentService } from "../attachments/attachment.service";
import { SuggestionsList } from "../suggestions/suggestions.component";

@Component({
  moduleId: 'module.id',
  selector: 'comments-list',
  templateUrl: 'list.component.html',
  //styleUrls: ['list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    AttachmentService // needs own instance
  ],
})

export class CommentsList implements OnInit, OnDestroy {

  guid : string;
  comments : Array<any> = [];
  offset : string = "";
  inProgress : boolean = true;

  @ViewChild('scrollArea') scrollArea : Content;
  @ViewChild('suggestionsList') suggestionsList : SuggestionsList;

  autofocus : boolean = false;
  @ViewChild('textarea') textareaComponent: TextareaComponent;

  editing : boolean = false;

  storage = new Storage();

  meta = {
    comment: '',
    attachment_guid: null,
    mature: 0,
  }

  components = {
    channel: ChannelComponent
  }

  minds = {
    cdn_url: CONFIG.cdnUrl
  }

  socketRoomName: string;
  socketSubscriptions: any = {
    comment: null
  };

  progress: number = 0;

  constructor(private client : Client, private cd : ChangeDetectorRef,  private params: NavParams, private sockets: SocketsService, public actionSheetCtrl: ActionSheetController, public attachment : AttachmentService){}

  ngOnInit() {
    this.attachment.emitter.subscribe((response : any) => {
      this.progress = response.progress;
      this.meta.attachment_guid = response.guid;
      this.cd.markForCheck();
      this.cd.detectChanges();
    });

    this.loadList()
      .then(() => {
        this.listen();
      });

    this.attachment.setContainerGuid(this.params.get('guid'));
  }

  ngOnDestroy() {
    this.unListen();
  }

  loadList(){
    let scrollPosition = 0; //bottom

    if(this.offset)
      scrollPosition = this.scrollArea.scrollHeight;

    return new Promise((res, err) => {
      this.inProgress = true;
      this.client.get('api/v1/comments/' + this.params.get('guid'), { limit: 12, offset: this.offset, reversed: true})
        .then((response : any) => {

          if (response.comments && response.comments.length >= 1) {
  					this.comments = response.comments.concat(this.comments);
            this.offset = response['load-previous'];
          }

          if (!this.socketRoomName && response.socketRoomName) {
            this.leaveSocketRoom();
            this.socketRoomName = response.socketRoomName;
            this.joinSocketRoom();
          }

          this.inProgress = false;
          res();
          this.cd.markForCheck();
          this.cd.detectChanges();

          //console.log('old height: ' + scrollPosition);
          //console.log('new height: ' + this.scrollArea.scrollHeight);
          //console.log('scroll to: ' + (this.scrollArea.scrollHeight - scrollPosition));
          //console.log(this.scrollArea);

          if(scrollPosition){
          //  this.scrollArea.scrollTo(this.scrollArea.scrollHeight - scrollPosition, 0, 100);
          } else {
            this.scrollArea.scrollToBottom(300);
          }
        });
    });
  }

  loadEarlier(puller){
    //console.log(puller);
    this.loadList()
      .then(() => {
        puller.complete();
      });
  }

  post() {
    if (this.progress > 0 && this.progress < 100) {
      return;
    }

    this.client.post('api/v1/comments/' +  this.params.get('guid'), this.meta)
      .then((response : any) => {
        this.meta = {
          comment: '',
          attachment_guid: null,
          mature: 0,
        };

        this.attachment.reset();
        this.progress = 0;

        this.comments.push(response.comment);
        this.cd.markForCheck();
        this.cd.detectChanges();
        this.scrollArea.scrollToBottom(300);
      });
  }


  delete(i){
    this.comments.splice(i, 1);
  }

  joinSocketRoom() {
    if (this.socketRoomName) {
      this.sockets.join(this.socketRoomName);
    }
  }

  leaveSocketRoom() {
    if (this.socketRoomName) {
      this.sockets.leave(this.socketRoomName);
    }
  }

  listen() {
    this.socketSubscriptions.comment = this.sockets.subscribe('comment', (parent_guid, owner_guid, guid) => {
      if (parent_guid !== this.params.get('guid')) {
        return;
      }

      if (owner_guid === this.storage.get('user_guid')) {
        return;
      }
      this.client.get('api/v1/comments/' + this.params.get('guid'), { limit: 1, offset: guid, reversed: false })
        .then((response: any) => {
          console.log(response);
          if (!response.comments || response.comments.length === 0) {
            return;
          }

          this.comments.push(response.comments[0]);
          this.cd.markForCheck();
          this.cd.detectChanges();
          this.scrollArea.scrollToBottom(300);
        })
        .catch(e => {});
    });
  }

  unListen() {
    if (this.socketSubscriptions.comment) {
      this.socketSubscriptions.comment.unsubscribe();
    }

    this.leaveSocketRoom();
  }

  openCamera(){
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Upload',
      buttons: [
        {
          text: 'Take a photo',
          icon: 'md-camera',
          handler: () => {
            this.attachment.takePicture()
          }
        },
        {
          text: 'Record a video',
          icon: 'md-videocam',
          handler: () => {
            this.attachment.takeVideo()
          }
        },
        {
          text: 'Pick from library',
          icon: 'md-image',
          handler: () => {
            this.attachment.selectFromLibrary();
          }
        },
        {
          text: 'Close',
          icon: 'md-close',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  setRichMeta(meta){
    this.meta = Object.assign(this.meta, meta);
  }

  moreActions(){
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Comment Options',
      buttons: [
        {
          text: !this.meta.mature ? 'Mark as Explicit' : 'Remove Explicit flag',
          handler: () => {
            this.toggleMature();
          }
        }
      ]
    });
    actionSheet.present();
  }

  toggleMature() {
    this.meta.mature = !this.meta.mature ? 1 : 0;
  }

  reply(comment) {
    if (!comment || !comment.ownerObj) {
      return;
    }

    this.meta.comment = `@${comment.ownerObj.username} ${this.meta.comment}`;
    setTimeout(() => {
      this.textareaComponent.focus();
    }, 50);
  }

  detectChanges(){
    this.cd.markForCheck();
    this.cd.detectChanges();
  }
}
