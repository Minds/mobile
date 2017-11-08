import { Component, OnInit, OnDestroy, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ChannelComponent } from '../channel/channel.component';
import { Client } from '../../common/services/api/client';
import { Storage } from '../../common/services/storage';

import { BlogView } from './view.component';

import { CONFIG, CATEGORIES } from '../../config';

@Component({
  moduleId: 'module.id',
  selector: 'blog-list',
  templateUrl: 'list.component.html',
  //styleUrls: ['list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class BlogsList {

  filter : string = 'featured';
  blogs : Array<any> = [];
  limit : number = 12;
  offset : string = "";
  inProgress : boolean = true;

  category : string = 'all';
  categories : Array<{id, label}> = CATEGORIES;

  components = {
    view: BlogView,
    channel: ChannelComponent
  }

  minds = {
    cdn_url: CONFIG.cdnUrl
  }

  constructor(private client : Client, private cd : ChangeDetectorRef, private nav : NavController, private params : NavParams,
    private storage : Storage){
    this.filter = this.params.get('filter');
  }

  ngOnInit(){
    this.loadList();
  }

  loadList(refresh : boolean = false){
    if(refresh)
      this.offset = "";
    return new Promise((res, err) => {
      this.inProgress = true;
      this.client.get('api/v1/blog/' + this.filter, { limit: 12, offset: this.offset})
        .then((response : any) => {
          if(refresh){
            this.blogs = [];
          }
          if(this.offset)
            this.blogs.shift();
          for(let blog of response.blogs){
            this.blogs.push(blog);
          }
          this.inProgress = false;
          this.offset = response['load-next'];
          res();
          this.cd.markForCheck();
          this.cd.detectChanges();
        });
    });
  }

  setCategory(category : string){
    this.category = category;
    if(this.category == 'all'){
      this.loadList(true);
      return;
    }

    this.client.get('api/v1/categories/featured/object/blog', {
        categories: this.category,
        limit: this.limit,
        offset: ''
      })
      .then((response : any) => {

        this.blogs = [];

        for(let entity of response.entities){
          this.blogs.push(entity);
        }

        this.inProgress = false;
        this.offset = response['load-next'];
        this.cd.markForCheck();
        this.cd.detectChanges();
      });
  }

  refresh(puller){
    puller.complete();
    this.offset = "";
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
