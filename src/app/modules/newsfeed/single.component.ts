import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { Client } from '../../common/services/api/client';


@Component({
  selector: 'newsfeed-single',
  template: `
    
  `
})

export class NewsfeedSingleComponent {

  guid : string;
  entity;
  inProgress : boolean = false;

  constructor(private client : Client, private params: NavParams){}

  ngOnInit(){
    this.guid = this.params.get('id');
    this.load();
  }

  load(){
    this.inProgress = true;
    this.client.get('api/v1/newsfeed/single/' + this.guid, {})
      .then((response : any) => {
        this.entity = response.activity;
      });
  }


}
