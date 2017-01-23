import { Injectable, EventEmitter } from '@angular/core';
import { Camera, MediaCapture, MediaFile, CaptureError, CaptureImageOptions } from 'ionic-native';

import { Upload } from '../../common/services/api/upload';

@Injectable()
export class AttachmentService{

  meta :any = {
  }

  emitter = new EventEmitter();
  progress : number = 0;

  constructor(private client : Upload){
  }

  takePicture(){

    MediaCapture.captureImage({
        limit: 1,
        //correctOrientation: true,
        //encodingType: 0, //jpeg
        //destinationType: Camera.DestinationType.FILE_URI,
        //allowEdit: true,
        //saveToPhotoAlbum: true
      })
      .then((data : MediaFile[]) => {
          this.upload(data[0].fullPath, 'image');
  			},
        (err) => {
  				console.log('capture failed');
  			});
  }

  takeVideo(){
    MediaCapture.captureVideo({
      limit: 1,
      duration: 360,
      //saveToPhotoAlbum: true
    })
    .then((data : MediaFile[]) => {
        this.upload(data[0].fullPath, 'video');
			},
      (err) => {
				console.log('capture failed');
			});
  }

  selectFromLibrary(){
    Camera.getPicture({
        correctOrientation: true,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: 0,
        mediaType: 2
      })
      .then((data) => {
        this.upload(data, '');
      }, (err) => {

      });
  }

  upload(file, type : string = ''){

    this.client.post('api/v1/archive/' + type, [ file ], {}, (progress) => {
        console.log('progress: ' + progress);
        this.progress = progress;
        this.emitter.next({ progress: progress});
      })
      .then((response : any) => {
        this.progress = 100;
        this.meta.attachment_guid = response.guid;
        console.log(response);
        this.emitter.next({ progress: 100, guid: response.guid });
      });
  }

  reset(){
    this.meta = {};
  }


}
