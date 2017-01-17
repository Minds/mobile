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
    this.loadList()
      .then(() => {

      });
  }

  loadList(){
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
        });
    });
  }

  loadEarlier(puller){
    this.loadList()
      .then(() => {
        puller.complete();
      });
  }


}
