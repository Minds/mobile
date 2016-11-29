import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Client } from '../../common/services/api/client';


@Component({
  selector: 'newsfeed-single',
  template: `
    <StackLayout>
      <activity [entity]="entity" *ngIf="entity"></activity>
    </StackLayout>
  `
})

export class NewsfeedSingleComponent {

  guid : string;
  entity;
  inProgress : boolean = false;

  constructor(private client : Client, private route : ActivatedRoute){}

  ngOnInit(){
    this.route.params.subscribe((params) => {
      this.guid = params['id'];
      this.entity = null;
      this.load();
    });
  }

  load(){
    this.inProgress = true;
    this.client.get('api/v1/newsfeed/single/' + this.guid, {})
      .then((response : any) => {
        this.entity = response.activity;
      });
  }


}
