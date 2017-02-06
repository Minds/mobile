import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from "@angular/core";
import { ModalController, NavController } from 'ionic-angular';

import { NotificationsList } from './list.component';
import { NotificationService } from './notification.service';

@Component({
  moduleId: 'module.id',
  selector: "notifications-counter",
  templateUrl: "counter.component.html",
  host: {
    '(click)': 'open()'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class NotificationsCounterComponent {

  subscription;
  unread : number = -1;

  constructor(private cd : ChangeDetectorRef, private navCtrl : NavController, private modalCtrl : ModalController,
    private service : NotificationService){
  }

  ngOnInit(){
    this.getCount();
    setInterval(() => {
      this.getCount(true);
    }, 10000);
  }

  open(e){
    this.navCtrl.push(NotificationsList);
    //this.modalCtrl.create(NotificationsList)
    //  .present();
  }

  getCount(refresh : boolean = false){
    if(this.subscription)
      this.subscription.unsubscribe();
    this.subscription = this.service.getCount(refresh)
      .subscribe(
        (count : number) => {
          this.unread = count;
          this.cd.markForCheck();
          this.cd.detectChanges();
        });
  }

}
