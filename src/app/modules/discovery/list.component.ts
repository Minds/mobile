import { Component, OnInit, OnDestroy, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { PhotoViewer } from 'ionic-native';

import { ChannelComponent } from '../channel/channel.component';
import { Client } from '../../common/services/api/client';
import { Storage } from '../../common/services/storage';


@Component({
  moduleId: 'module.id',
  selector: 'discovery-list',
  templateUrl: 'list.component.html',
  //styleUrls: ['list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DiscoveryList {

  filter : string = 'featured';
  type : string = 'images';
  feed : Array<any> = [];
  offset : string = "";
  inProgress : boolean = true;

  storage = new Storage();

  components = {
    channel: ChannelComponent
  }

  constructor(private client : Client, private cd : ChangeDetectorRef){}

  ngOnInit(){
    this.loadList();
  }

  loadList(){
    return new Promise((res, err) => {
      this.inProgress = true;
      this.client.get('api/v1/entities/' + this.filter + '/' + this.type, { limit: 15, offset: this.offset})
        .then((response : any) => {
          //console.log(response);
          for(let entity of response.entities){
            this.feed.push(entity);
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
    this.feed = [];
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

  openImage(entity : any){
    PhotoViewer.show('https://edge.minds.com/api/v1/archive/thumbnails/' + entity.guid + '/xlarge');
  }

}
