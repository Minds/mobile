import { Component, OnInit, OnDestroy, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NavParams } from 'ionic-angular';

import { ChannelComponent } from '../channel/channel.component';
import { Client } from '../../common/services/api/client';
import { Storage } from '../../common/services/storage';

@Component({
  moduleId: 'module.id',
  selector: 'comments-list',
  templateUrl: 'list.component.html',
  //styleUrls: ['list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CommentsList {

  guid : string;
  comments : Array<any> = [];
  offset : string = "";
  inProgress : boolean = true;

  storage = new Storage();

  components = {
    channel: ChannelComponent
  }

  constructor(private client : Client, private cd : ChangeDetectorRef,  private params: NavParams){}

  ngOnInit(){
    this.loadList();
  }

  loadList(){
    return new Promise((res, err) => {
      this.inProgress = true;
      this.client.get('api/v1/comments/' + this.params.get('guid'), { limit: 12, offset: this.offset})
        .then((response : any) => {
          //console.log(response);
          for(let comment of response.comments){
            this.comments.push(comment);
          }
          this.inProgress = false;
          this.offset = response['load-next'];
          res();
          this.cd.markForCheck();
          this.cd.detectChanges();
        });
    });
  }

  refresh(puller){
    puller.complete();
    this.offset = "";
    this.comments = [];
    this.loadList()
      .then(() => {
        puller.complete();
      });
  }

  loadMore(e){
    this.loadList()
      .then(() => {
        e.complete();
      });
  }

}
