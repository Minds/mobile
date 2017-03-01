import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';

import { TabsComponent } from '../tabs/tabs.component';
import { Client } from '../../common/services/api/client';

@Component({
  moduleId: 'module.id',
  selector: 'categories',
  templateUrl: 'categories.component.html',
  //styleUrls: ['login.component.css']
})

export class CategoriesComponent {

  minds = {
    cdn_url: 'https://edge.minds.com/'
  }

  categories : Array<{id, label, selected}> = [
    { id: "awesome", label: "Awesome", selected : false },
    { id: "art", label: "Art", selected : false },
    { id: "music", label: "Music", selected : false },
    { id: "technology", label: "Science & Technology", selected : false },
    { id: "gaming", label: "Gaming", selected : false },
    { id: "nature", label: "Nature", selected : false },
    { id: "news", label: "News", selected : false }
  ];

  channels : Array<any> = [];
  inProgress : boolean = false;
  @Output() done : EventEmitter<any> = new EventEmitter();

  constructor(private client : Client, private nav : NavController, public loadingCtrl: LoadingController, private alertCtrl: AlertController){
  }

  ngOnInit(){

  }

  showLoader(){
    let loader = this.loadingCtrl.create({
      //content: "Please wait...",
    });
    loader.present();

    setTimeout(loader.dismiss, 5000);

    return loader;
  }

  findChannels(){
    let loader = this.showLoader();
    this.inProgress = true;
    this.client.get('api/v1/categories/featured', {
        categories: this.categories
          .filter((category) => {
            return category.selected;
          })
          .map((category) => {
            return category.id;
          })
      })
      .then((response : any) => {
        loader.dismiss();
        this.inProgress = false;
        this.channels = response.entities.map((channel) => {
          channel.selected = true;
          return channel;
        });
      })
      .catch(() => {
        loader.dismiss();
        this.inProgress = false;
      })
  }

  subscribe(){
    //let loader = this.showLoader();
    this.client.post('api/v1/subscribe/batch', {
        guids: this.channels
          .filter((channel) => {
            return channel.selected;
          })
          .map((channel) => {
            return channel.guid
          })
      });
    this.done.next(true);
  }

  ngOnDestroy(){
    //this.loader.dismiss();
  }

}
