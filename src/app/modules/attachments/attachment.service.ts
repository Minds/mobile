import { Injectable, EventEmitter } from '@angular/core';
import { Camera, MediaCapture, MediaFile, CaptureError, CaptureImageOptions } from 'ionic-native';

import { Upload } from '../../common/services/api/upload';

@Injectable()
export class AttachmentService{

  meta :any = {
  }
  previewUri : string = "";
  previewDataUri : string = "";

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
          this.previewUri = data[0].fullPath;
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
        this.previewUri = 'video.png';
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

        let type = 'video';

        var image = ["images", "document/image", '.jpg', '.JPG', '.jpeg', '.JPEG', '.png', '.PNG', '.bmp', '.BMP', '.gif', '.GIF'];
				for (var i = 0; i < image.length; i++) {
					if (data.indexOf(image[i]) > -1) {
						type = 'image';
						break;
					}
				}

        this.previewUri = data;
        this.upload(data, type);
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

  setContainerGuid(guid){
    this.meta.container_guid = guid;
    return this;
  }

  setAccessId(access_id) {
    this.meta.access_id = access_id;
    return this;
  }

  reset(){
    this.meta.attachment_guid = '';
    this.previewUri = '';
    this.progress = 0;
    this.emitter.next({ progress: 0, guid: '' });
  }


}
