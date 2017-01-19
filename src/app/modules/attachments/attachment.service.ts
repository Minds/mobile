import { Camera, MediaCapture, MediaFile, CaptureError, CaptureImageOptions } from 'ionic-native';

import { Upload } from '../../common/services/api/upload';

export class AttachmentService{

  meta :any = {
  }

  constructor(private client : Upload){
    this.client = new Upload();
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
          this.upload(data[0].fullPath);
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
        this.upload(data[0].fullPath);
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
        this.upload(data[0].fullPath);
      }, (err) => {

      });
  }

  upload(file){
    this.client.post('api/v1/archive', [ file ], {}, (progress) => {
        console.log('progress: ' + progress);
      })
      .then((response : any) => {
        this.meta.attachment_guid = response.guid;
        console.log(response);
      });
  }

  reset(){
    this.meta = {};
  }


}
