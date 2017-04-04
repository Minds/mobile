import { Component, OnInit, OnDestroy, EventEmitter } from '@angular/core';

import { Client } from '../../common/services/api/client';
import { Storage } from '../../common/services/storage';

export class DiscoveryService {

  emitter : EventEmitter<any> = new EventEmitter();

  entities : Array<any> = [];
  offset : string = "";
  limit : number = 15;
  inProgress : boolean = false;
  q;

  filter : string = "featured";
  type : string = "object/image";
  category : string = "all";

  constructor(private client : Client, private storage : Storage){
    if(this.storage.get('saved.discovery.filter'))
      this.filter = <string>this.storage.get('saved.discovery.filter');
    if(this.storage.get('saved.discovery.type'))
      this.type = <string>this.storage.get('saved.discovery.type');
  }

  setFilter(filter : string){
    this.filter = filter;
    this.storage.set('saved.discovery.filter', filter);
  }

  setType(type : string){
    this.type = type;
    this.storage.set('saved.discovery.type', type);
  }

  setCategory(category : string){
    this.category = category;
    if(this.category == 'all'){
      this.get(true);
      return;
    }

    this.client.get('api/v1/categories/featured/' + this.type, {
        categories: this.category,
        limit: this.limit,
        offset: this.offset
      })
      .then((response : any) => {

        this.entities = [];

        for(let entity of response.entities){
          this.entities.push(entity);
        }

        this.emitter.next(this.entities);
        this.inProgress = false;
        this.offset = response['load-next'];
      });
  }

  search(q : string){
    this.q = q;

    //hastags need to reset filters and types
    this.type = <string>this.storage.get('saved.discovery.type');
    this.filter = <string>this.storage.get('saved.discovery.type');

    if(!q){
      return this.reset();
    }

    let endpoint = 'api/v1/search/suggest';
    this.filter = 'search';

    if(q.indexOf("#") > -1){
      endpoint = 'api/v1/search';
      this.type = "activity";
    } else {
      //this.setType('user'); //don't use setType as this overwrites the default
      this.type = 'user';
    }

    this.emitter.next([]);

    this.client.get(endpoint, {
        q: q,
        type: this.type == 'activity' ? 'activities' : this.type,
        limit: 12,
        offset: ""
      })
      .then((response : any) => {
        if(this.type == 'activity'){
          this.entities = response.entities;
        } else {
          this.entities = response.suggestions;
        }

        this.emitter.next(this.entities);
        this.offset = response['load-next'];
        this.inProgress = false;
      });
  }

  get(refresh : boolean = false){
    if(refresh)
      this.offset = "";

    if(this.type == 'activity'){ //for refresh and load more
      return this.client.get('api/v1/search', {
          q: this.q,
          type: this.type,
          limit: 12,
          offset: this.offset
        })
        .then((response : any) => {
          for(let entity of response.entities){
            this.entities.push(entity);
          }

          this.emitter.next(this.entities);
          this.offset = response['load-next'];
          this.inProgress = false;
          return true;
        });
    }

    return this.client.get('api/v1/entities/' + this.filter + '/' + this.type, { limit: this.limit, offset: this.offset})
      .then((response : any) => {

        if(refresh)
          this.entities = [];

        if(this.offset)
          response.entities.shift();

        for(let entity of response.entities){
          this.entities.push(entity);
        }

        this.emitter.next(this.entities);
        this.inProgress = false;
        this.offset = response['load-next'];
        return true;
      });

  }

  reset(){
    this.entities = [];
    this.q = "";
    this.offset = "";
    if(this.storage.get('saved.discovery.filter')){
      this.filter = <string>this.storage.get('saved.discovery.filter');
    } else {
      this.filter = 'featured';
    }
    if(this.storage.get('saved.discovery.type')){
      this.type = <string>this.storage.get('saved.discovery.type');
    } else {
      this.type = 'object/image';
    }
    this.get(true);
  }

  static _(client : Client, storage : Storage){
    return new DiscoveryService(client, storage);
  }

}
