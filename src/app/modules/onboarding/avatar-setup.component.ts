import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';

import { TabsComponent } from '../tabs/tabs.component';
import { Upload } from '../../common/services/api/upload';

@Component({
  moduleId: 'module.id',
  selector: 'avatar-setup',
  templateUrl: 'avatar-setup.component.html',
  //styleUrls: ['login.component.css']
})

export class AvatarSetupComponent {

  @Output() done : EventEmitter<any> = new EventEmitter();

  constructor(private upload : Upload, private nav : NavController, public loadingCtrl: LoadingController, private alertCtrl: AlertController, private camera: Camera){
  }

  ngOnInit(){

  }

  selectAvatar(){
    this.camera.getPicture({
        correctOrientation: true,
        destinationType: this.camera.DestinationType.FILE_URI,
        sourceType: 0,
        mediaType: 2
      })
      .then((data) => {
        let loader = this.loadingCtrl.create({
          //content: "Please wait...",
        });
        loader.present();

        this.upload.post('api/v1/channel/avatar', [ data ])
          .then((response : any) => {
            loader.dismiss();
            this.done.next(true);
          })
          .catch((exception)=>{
            loader.dismiss();
          });
      }, (err) => {
      });
  }

}
