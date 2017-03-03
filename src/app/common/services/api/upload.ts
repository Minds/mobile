import { Injectable, Inject } from '@angular/core';
import { Transfer } from 'ionic-native';
import { Http, Headers } from '@angular/http';
import { OAuth2 } from './oauth2';
import { Storage } from '../storage';

import { CONFIG } from '../../../config';

/**
 * API Class
 */
export class Upload  {

  base : string = CONFIG.baseUrl;
  oauth2;

  storage = new Storage();

	constructor(){
	}


	post(endpoint : string, files : Array<any> = [], data : any = {}, progress : Function = ()=>{}){

    const fileTransfer = new Transfer();

    var options: any;

    options = {
      fileKey: 'file',
      headers: {
        'Authorization': 'Bearer ' + this.storage.get('access_token')
      }
    }

    return new Promise((resolve, reject) => {

      fileTransfer.upload(files[0], this.base + endpoint, options)
        .then((data) => {
          resolve(JSON.parse(data.response));
         // success
        }, (err) => {
          reject(err);
          console.log(err);
         // error
        });

      fileTransfer.onProgress((e : any) => {
        progress(Math.floor(e.loaded / e.total * 100));
      });

    });

  }

}
