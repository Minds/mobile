import { Component, OnInit, OnDestroy, Input, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, AfterContentInit } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController, ActionSheetController, AlertController, Content } from 'ionic-angular';
import { Camera } from 'ionic-native';

import { Client } from '../../common/services/api/client';
import { Upload } from '../../common/services/api/upload';
import { CacheService } from '../../common/services/cache/cache.service';
import { Storage } from '../../common/services/storage';
import { SubscribersComponent } from './subscribers.component';
import { BlogsList } from '../blog/list.component';
import { OnScreenService } from "../../common/services/visibility/on-screen.service";

import { MessengerView } from '../messenger/view.component';

import { CONFIG } from '../../config';
import { BannerComponent } from "../banner/banner.component";

@Component({
  moduleId: 'module.id',
  selector: 'channel',
  templateUrl: 'channel.component.html',
  //styleUrls: [ 'channel.component.css' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ChannelComponent implements OnInit, OnDestroy, AfterContentInit {
  @ViewChild('bannerComponent') bannerComponent: BannerComponent;

  minds = {
    cdn_url: CONFIG.cdnUrl
  }

  guid : string = "me";
  channel : any = {};

  fileToUpload;

  editing = {
    banner : false,
    name: false,
    avatar: false
  };

  feedType : string = "activity";

  components = {
    subscribers: SubscribersComponent
  }

  @ViewChild('scrollArea') scrollArea: Content;
  onScreen = new OnScreenService();

  constructor(private client : Client, private upload : Upload, private nav : NavController, private params: NavParams, private cache : CacheService,
    private cd: ChangeDetectorRef, private loadingCtrl : LoadingController, private storage : Storage, private actionSheetCtrl : ActionSheetController,
    private toastCtrl : ToastController, private alertCtrl : AlertController){
    //if(applicationModule.android)
    //  page.actionBarHidden = true;
  }

  ngOnInit(){
    this.guid = this.params.get('guid');
    if(this.params.get('channel')){
      this.channel = this.params.get('channel');
      if(this.channel){
        this.guid = this.channel.guid;
        //return;
      }
    }

    this.load();
  }

  ngAfterContentInit() {
    this.onScreen.init(this.scrollArea);
  }

  ngOnDestroy() {
    this.onScreen.destroy();
  }

  @Input() set username(value : string){
    this.channel = null;
    this.guid = value;
    this.load();
  }

  //ngAfterViewInit() {
    //this.loadFeed();
  //}

  load(){
    let _channel = this.cache.get('channel:' + this.guid);
    if(_channel && !this.channel){
      this.channel = _channel;
      this.cd.markForCheck();
      this.cd.detectChanges();
      //return true;
    }

    this.client.get('api/v1/channel/' + this.guid)
      .then((response : any) => {
        this.channel = response.channel;
        this.cache.set('channel:' + this.guid, this.channel, true);
        this.cd.markForCheck();
        this.cd.detectChanges();
      });
  }

  save(data : any){
    this.client.post('api/v1/channel/' + this.guid, data)
      .then(() => {});
  }

  changeAvatar(){
    //can change?
    if(this.channel.guid != this.storage.get('user_guid'))
      return;

    Camera.getPicture({
        correctOrientation: true,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: 0,
        mediaType: 2
      })
      .then((data) => {
        let loader = this.loadingCtrl.create({
          content: "Uploading...",
        });
        loader.present();

        this.upload.post('api/v1/channel/avatar', [ data ])
          .then((response : any) => {
            loader.dismiss();
            this.channel.icontime = Date.now();
            this.cd.markForCheck();
            this.cd.detectChanges();
          })
          .catch((exception)=>{
            loader.dismiss();
          });
      }, (err) => { });

  }

  subscribe(){
    if(this.channel.subscribed){
      return this.unsubscribe();
    }
    this.channel.subscribed = true;
    this.cd.markForCheck();
    this.cd.detectChanges();
    this.client.post('api/v1/subscribe/' + this.channel.guid, {})
      .then((response : any) => {
          this.channel.subscribed = true;
      })
      .catch((e) => {
        this.channel.subscribed = false;
        this.cd.markForCheck();
        this.cd.detectChanges();
      });
  }

  unsubscribe(){
    this.channel.subscribed = false;
    this.cd.markForCheck();
    this.cd.detectChanges();
    this.client.delete('api/v1/subscribe/' + this.channel.guid, {})
      .then((response : any) => {
          this.channel.subscribed = false;
      })
      .catch((e) => {
        this.channel.subscribed = true;
        this.cd.markForCheck();
        this.cd.detectChanges();
      });
  }

  refresh(){

  }

  openActions(){

    let buttons = [];

    if(!this.channel.blocked && this.channel.guid != this.storage.get('user_guid')){
      buttons.push({
        text: 'Block',
        handler: () => {
          this.client.put('api/v1/block/' + this.channel.guid, {})
            .then((response : any) => {
              this.channel.blocked = true;
            })
            .catch((e) => {
              this.channel.blocked = false;
            });
        }
      });
    } else if(this.channel.guid != this.storage.get('user_guid')) {
      buttons.push({
        text: 'Unblock',
        handler: () => {
          this.client.delete('api/v1/block/' + this.channel.guid, {})
            .then((response : any) => {
              this.channel.blocked = false;
            })
            .catch((e) => {
              this.channel.blocked = true;
            });
        }
      });
    }

    if(this.channel.guid != this.storage.get('user_guid')){
      buttons.push({
        text: 'Send message',
        handler: () => {
          this.nav.push(MessengerView, { guid : this.getMessengerGuid() });
        }
      });
    }

    buttons.push({
      text: 'View blogs',
      handler: () => {
        this.nav.push(BlogsList, { filter: 'owner/' + this.channel.guid });
      }
    });

    buttons.push({
      text: 'View feed',
      handler: () => {
        this.feedType = 'activity';
        this.cd.markForCheck();
        this.cd.detectChanges();
      }
    });

    buttons.push({
      text: 'View images',
      handler: () => {
        this.feedType = 'image';
        this.cd.markForCheck();
        this.cd.detectChanges();
      }
    });

    buttons.push({
      text: 'View videos',
      handler: () => {
        this.feedType = 'video';
        this.cd.markForCheck();
        this.cd.detectChanges();
      }
    });

    buttons.push({
      text: 'Cancel',
      role: 'cancel'
    });

    let actionSheet = this.actionSheetCtrl.create({
      //title: '',
      buttons: buttons
    });
    actionSheet.present();
  }

  showWarningReplaceBannerImage(){
    if(this.channel.carousels){
      let alert = this.alertCtrl.create({
        title: 'Confirm upload banner image',
        message: 'Adding a new banner will replace all existing banners on your channel.',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              this.showToast("Image upload cancelled by user.");
            }
          },
          {
            text: 'Upload',
            handler: () => {
              this.uploadBannerImage();
            }
          }
        ]
      });
      alert.present();
    } else {
      this.uploadBannerImage();
    }
  }

  setUploadFile(fileSrc){
    this.fileToUpload = fileSrc;
  }

  private showToast(message : string){
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

  private uploadBannerImage() {
    if(this.fileToUpload){
      let loader = this.loadingCtrl.create({
        content: "Uploading...",
      });
      loader.present();

      this.upload.post('api/v1/channel/banner', [this.fileToUpload], {top : 0})
        .then((response : any) => {
          loader.dismiss();
          this.showToast("Image uploaded!");
          console.log(response);
        });
    } else {
      this.showToast("No image selected!");
    }
  }

  cancelUpload(){
    this.fileToUpload = "";
    this.bannerComponent.resetPicture();
  }

  private getMessengerGuid(){
    let participants = [ this.channel.guid, this.storage.get('user_guid') ];
    participants.sort((a, b) => a < b ? -1 : 1);
    return participants.join(':');
  }

}
