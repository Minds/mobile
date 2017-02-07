import { Component, OnInit, OnDestroy, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { PopoverController } from 'ionic-angular';
import { PhotoViewer } from 'ionic-native';

import { ChannelComponent } from '../channel/channel.component';
import { Client } from '../../common/services/api/client';
import { Storage } from '../../common/services/storage';

import { DiscoveryOptionsComponent } from './options.component';
import { DiscoveryService } from './discovery.service';

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
  layout : string = 'tiles';

  feed : Array<any> = [];
  offset : string = "";
  inProgress : boolean = true;

  storage = new Storage();

  components = {
    channel: ChannelComponent
  }

  constructor(private client : Client, private popoverCtrl : PopoverController, private cd : ChangeDetectorRef,
    private service : DiscoveryService){}

  ngOnInit(){
    this.loadList();
    this.service.emitter.subscribe(() => {
      this.cd.markForCheck();
      this.cd.detectChanges();
    });
  }

  loadList(){
    this.service.get();
  }

  refresh(puller){
    this.service.get(true)
      .then(() => {
        puller.complete();
        this.cd.markForCheck();
        this.cd.detectChanges();
      });
  }

  loadMore(e){
    this.service.get()
      .then(() => {
        e.complete();
        this.cd.markForCheck();
        this.cd.detectChanges();
      });
  }

  openOptions(){
    this.popoverCtrl.create(DiscoveryOptionsComponent, {
      callback: (data) => {
        console.log(data);
      }
    })
    .present();
  }

  openImage(entity : any){
    PhotoViewer.show('https://edge.minds.com/api/v1/archive/thumbnails/' + entity.guid + '/xlarge');
  }

}
