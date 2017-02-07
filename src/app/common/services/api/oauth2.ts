import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { Storage } from '../storage';
//import { OAUTH2 } from '../../../../../config/config';

@Injectable()
export class OAuth2{

  client_id = "";
  client_secret = "";
  access_token;
  timestamp = 0;

  constructor(public http : Http, private storage : Storage){
  }

  buildParams(params) {
  //	params.client_id = this.client_id;
  	params.access_token = this.storage.get("access_token");
    return params;
  }

  hasAccessToken(){
    if(this.storage.get("access_token"))
      return true;
    else
      return false;
  }

  login(username, password, callback){

		this.http.post('https://edge.minds.com/oauth2/token',
        {
  			  'grant_type': 'password',
  				'client_id': this.client_id,
  				'client_secret': this.client_secret,
  				'username': username,
  				'password': password
  			}
      )
      .subscribe(
        res => {

          var data = res.json();
          //appSettings.setString('access_token', data.access_token);
          //appSettings.setString('user_guid', data.user_id);
          this.storage.set('user_id', data.user_id);
          this.storage.set('user_guid', data.user_id);
          this.storage.set('access_token', data.access_token);
          this.storage.set('loggedin', true);
          this.storage.set('loggedin_', true);

          //reconnect
          //socket.emit('register', data.user_id, data.access_token);

          callback(true);
  		},
      err => {
  			console.log('fail..');
  			callback(false);
  		});

	}

}
