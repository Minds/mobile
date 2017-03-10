import { Component, OnInit, OnDestroy, Input, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { NavParams, ViewController, LoadingController } from 'ionic-angular';

import { Client } from '../../common/services/api/client';
import { Storage } from '../../common/services/storage';

import { CONFIG } from '../../config';

@Component({
  moduleId: 'module.id',
  selector: 'capture',
  templateUrl: 'view.component.html',
  //styleUrls: ['list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class BlogView {

  minds = {
    cdn_url: CONFIG.cdnUrl
  }

  @Input() guid : string;
  blog = {};

  loaded: boolean = true;
  loader;

  constructor(private client : Client, private params : NavParams, private viewCtrl : ViewController,
    private loadingCtrl : LoadingController, private storage : Storage, private cd : ChangeDetectorRef){

  }

  ngOnInit(){
    this.guid = this.params.get('guid');
    this.loader = this.loadingCtrl.create({
      //content: "Please wait...",
    });
    this.load();
  }

  load() {
    this.loaded = false;

    setTimeout(() => {
      if (!this.loaded) {
        this.loader.present();
      }
    }, 100);

    this.client.get('api/v1/blog/' + this.guid)
      .then((response: any) => {
        this.loaded = true;
        this.blog = response.blog;
        this.loader.dismiss();
        this.cd.detectChanges();
        this.cd.markForCheck();
      })
      .catch(() => {
        this.loaded = true;
        this.dismiss();
      })
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

  ngOnDestroy(){
    if(this.loader){
      this.loader.dismiss();
    }
  }

}
