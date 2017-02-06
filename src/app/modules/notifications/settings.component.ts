import { Component, OnInit, OnDestroy, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { LoadingController } from 'ionic-angular';

import { ChannelComponent } from '../channel/channel.component';
import { Client } from '../../common/services/api/client';
import { Storage } from '../../common/services/storage';


@Component({
  moduleId: 'module.id',
  selector: 'notification-settings',
  templateUrl: 'settings.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class NotificationSettingsComponent {

  storage = new Storage();

  toggles = [
    { id: 'daily', name: 'Daily Reward', icon: 'md-trophy', toggle: true },
    { id: 'comment', name: 'Comments', icon: 'md-chatbubble', toggle: true },
    { id: 'like', name: 'Votes', icon: 'md-thumbs-up', toggle: true },
    { id: 'tag', name: 'Tags', icon: 'md-at', toggle: true },
    { id: 'friends', name: 'Subscriptions', icon: 'md-person-add', toggle: true },
    { id: 'reminds', name: 'Reminds', icon: 'md-repeat', toggle: true },
    { id: 'boost_request', name: 'Peer2Peer boosts', icon: 'md-trending-up', toggle: true },
    { id: 'boost_accepted', name: 'Approved boosts', icon: 'md-trending-up', toggle: true },
    { id: 'boost_rejected', name: 'Rejected boosts', icon: 'md-trending-up', toggle: true },
    { id: 'boost_completed', name: 'Fulfilled boosts', icon: 'md-trending-up', toggle: true }
  ]

  inProgress : boolean = false;

  constructor(private client : Client, private loadingCtrl : LoadingController, private cd : ChangeDetectorRef){}

  ngOnInit(){
    this.load();
  }

  load(){
    this.inProgress = true;
    this.client.get('api/v1/notifications/settings')
      .then((response : any) => {
        for (var toggle in this.toggles) {
          this.toggles[toggle].toggle = response.toggles[toggle];
        }
        this.inProgress = false;
        this.cd.markForCheck();
        this.cd.detectChanges();
      });
  }

  setToggle(toggle) {
    this.client.post('api/v1/notifications/settings', {
      id: toggle.id,
      toggle: toggle.toggle
    });
  }


}
