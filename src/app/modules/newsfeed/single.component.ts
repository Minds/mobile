import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NavParams, NavController, App } from 'ionic-angular';
import { Client } from '../../common/services/api/client';
import { BlogView } from "../blog/view.component";
import { DiscoveryView } from "../discovery/view.component";


@Component({
  selector: 'newsfeed-single',
  templateUrl: 'single.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class NewsfeedSingleComponent {

  guid : string;
  entity;
  inProgress : boolean = false;

  constructor(private navCtrl : NavController, private client : Client, private params: NavParams, private cd : ChangeDetectorRef, private app: App){}

  ngOnInit(){
    this.guid = this.params.get('guid');
    this.load();
  }

  load(){
    this.inProgress = true;
    this.client.get('api/v1/newsfeed/single/' + this.guid, {})
      .then((response : any) => {
        this.entity = response.activity;

        if (this.entity.type != 'activity') {
          let navTo;

          if (this.entity.subtype === 'blog') {
            navTo = this._navTo(BlogView, { guid: this.entity.guid }, { animate: false });
          } else if (this.entity.type === 'object') {
            navTo = this._navTo(DiscoveryView, { guid: this.entity.guid }, { animate: false });
          }

          navTo
            .then(() => {
              this.navCtrl.remove(this.navCtrl.length() - 2); // remove this view from stack
            });

          return;
        }

        this.cd.markForCheck();
        this.cd.detectChanges();
      });
  }

  ionViewCanEnter(): boolean {
    let active = this.navCtrl.getActive();
    let previousGuid = this.params.get('guid');

    if(active.component.name === "NewsfeedSingleComponent" && previousGuid === active.data.guid){
      return false;
    }

    return true;
  }

  private _navTo(...args): Promise<any> {
    return this.app.getActiveNav().push.apply(this.app.getActiveNav(), args);
  }
}
