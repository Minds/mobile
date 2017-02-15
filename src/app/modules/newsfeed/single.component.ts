import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { Client } from '../../common/services/api/client';


@Component({
  selector: 'newsfeed-single',
  templateUrl: 'single.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class NewsfeedSingleComponent {

  guid : string;
  entity;
  inProgress : boolean = false;

  constructor(private client : Client, private params: NavParams, private cd : ChangeDetectorRef){}

  ngOnInit(){
    this.guid = this.params.get('guid');
    this.load();
  }

  load(){
    this.inProgress = true;
    this.client.get('api/v1/newsfeed/single/' + this.guid, {})
      .then((response : any) => {
        this.entity = response.activity;
        this.cd.markForCheck();
        this.cd.detectChanges();
      });
  }


}
