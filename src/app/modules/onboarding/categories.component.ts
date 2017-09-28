import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';

import { TabsComponent } from '../tabs/tabs.component';
import { Client } from '../../common/services/api/client';

import { CONFIG } from '../../config';

@Component({
  moduleId: 'module.id',
  selector: 'categories',
  templateUrl: 'categories.component.html',
  //styleUrls: ['login.component.css']
})

export class CategoriesComponent {

  minds = {
    cdn_url: CONFIG.cdnUrl
  }

  categories : Array<{id, label, selected}> = [];

  channels : Array<any> = [];
  inProgress : boolean = false;
  @Output() done : EventEmitter<any> = new EventEmitter();

  constructor(private client : Client, private nav : NavController, public loadingCtrl: LoadingController, private alertCtrl: AlertController){
    this.client.get('api/v1/categories').then((categories: any) => {
      for (let id in categories.categories) {
        this.categories.push({
          id: id,
          label: categories.categories[ id ],
          selected: false
        });
      }
      this.categories.sort((a, b) => a.label > b.label ? 1 : -1);
    });
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

  saveCategories(){
    let loader = this.showLoader();
    this.inProgress = true;
    this.client.post('api/v1/settings', {
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
        this.done.next(true);
      })
      .catch(() => {
        loader.dismiss();
        this.inProgress = false;
      })
  }

  ngOnDestroy(){
    //this.loader.dismiss();
  }

}
