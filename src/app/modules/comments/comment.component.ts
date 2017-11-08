import { Component, OnInit, OnDestroy, Input, Output, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, EventEmitter } from '@angular/core';
import { NavParams, Content, ActionSheetController } from 'ionic-angular';

import { ChannelComponent } from '../channel/channel.component';
import { Client } from '../../common/services/api/client';
import { Storage } from '../../common/services/storage';
import { ReportService } from '../report/report.service';
import { ExplicitImgComponent } from '../../../common/components/explicit/explicit-image.component';
import { ExplicitTextComponent } from '../../../common/components/explicit/explicit-text.component';

import { CONFIG } from '../../config';
import { SocketsService } from "../../common/services/api/sockets.service";

@Component({
  moduleId: 'module.id',
  selector: 'comment',
  templateUrl: 'comment.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CommentComponent{

  @Input() entity;
  editing : boolean = false;
  @Output() deleted : EventEmitter<any> = new EventEmitter();
  @Output() onReply: EventEmitter<any> = new EventEmitter();

  storage = new Storage();

  components = {
    channel: ChannelComponent
  }

  minds = {
    cdn_url: CONFIG.cdnUrl
  }


  constructor(private client : Client, private cd : ChangeDetectorRef,  private params : NavParams, private report : ReportService,
    private actionSheetCtrl : ActionSheetController){}

  save(){
    this.client.post('api/v1/comments/update/' + this.entity.guid, {
      description: this.entity.description
    });
    this.editing = false;
    this.cd.markForCheck();
    this.cd.detectChanges();
  }

  delete(){
    this.client.delete('api/v1/comments/' + this.entity.guid);
    this.deleted.next(true);
  }

  openSettings(e){
    let buttons = [];

    if(this.storage.get('user_guid') == this.entity.owner_guid){
      buttons.push({
        text: 'Delete',
        icon: 'md-trash',
        role: 'destructive',
        handler: () => {
          this.delete()
        }
      });
      buttons.push({
        text: 'Edit',
        icon: 'md-create',
        handler: () => {
          this.editing = true;
          this.cd.markForCheck();
          this.cd.detectChanges();
        }
      });
    } else {
      buttons.push({
        text: 'Reply',
        icon: 'ios-undo',
        handler: () => {
          this.onReply.emit({ comment: this.entity });
        }
      });
    }

    buttons.push({
      text: 'Report',
      icon: 'md-alert',
      handler: () => {
        this.report.report(this.entity.guid);
      }
    });

    buttons.push({
      text: 'Cancel',
      icon: 'md-close',
      role: 'cancel'
    });

    this.actionSheetCtrl.create({
        buttons: buttons
      })
      .present();
  }

}
