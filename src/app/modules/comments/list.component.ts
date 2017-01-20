import { Component, OnInit, OnDestroy, Input, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { NavParams, Content } from 'ionic-angular';

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
  @ViewChild('scrollArea') scrollArea : Content;

  storage = new Storage();
  message : string = "";

  components = {
    channel: ChannelComponent
  }

  constructor(private client : Client, private cd : ChangeDetectorRef,  private params: NavParams){}

  ngOnInit(){
    this.loadList()
      .then(() => {

      });
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

  post(){
    
  }


}
