import { Injectable, Inject } from '@angular/core';
import {Http, Headers} from '@angular/http';
import { OAuth2 } from './oauth2';
import { Storage } from '../storage';

@Injectable()
export class Client {
	base : string = "https://edge.minds.com/";
  oauth2;

  storage = new Storage();

	constructor(public http : Http){
    this.oauth2 = new OAuth2(http);
	}

	private buildParams(object : Object){
    object = this.oauth2.buildParams(object);
		return Object.keys(object).map((k) => {
			return encodeURIComponent(k) + "=" + encodeURIComponent(object[k]);
		}).join('&');
	}

	/**
	 * Build the options
	 */
	private buildOptions(options : Object){
    //TODO: for shared library need to support XSRF AND OAUTH2

		var headers = new Headers();
		headers.append('Authorization', 'Bearer ' + this.storage.get('access_token'));
		var Objecti : any = Object;
		return Objecti.assign(options, {
			headers: headers,
			cache: false
		});
	}

	/**
	 * Return a GET request
	 */
	get(endpoint : string, data : Object = {}, options: Object = {}){
		var self = this;
		endpoint += "?" + this.buildParams(data);
		return new Promise((resolve, reject) => {
			self.http.get(
					self.base + endpoint
				)
				.subscribe(
          res => {
  					var data = res.json();
  					if(!data || data.status != 'success')
  						return reject(data);

  					return resolve(data);
				  },
          err => {
            if(err.status == 401 && err.json().loggedin === false){
              //window.location.href="/login";
              return reject(err);
            }
            return reject(err);
          });
		});
	}

	/**
	 * Return a POST request
	 */
	post(endpoint : string, data : Object = {}, options: Object = {}){
		var self = this;
		return new Promise((resolve, reject) => {
			self.http.post(
					self.base + endpoint,
					JSON.stringify(data),
					this.buildOptions(options)
				)
				.subscribe(
          res => {
						var data = res.json();
						if(!data || data.status != 'success')
							return reject(data);

						return resolve(data);
				  },
          err => {
            if(err.status == 401 && err.json().loggedin === false){
							window.location.href="/login";
							return reject(err);
						}
						if(err.status != 200){
							return reject(err.json());
						}
          });
		});
	}

	/**
	 * Return a PUT request
	 */
	put(endpoint : string, data : Object = {}, options: Object = {}){
		var self = this;

		return new Promise((resolve, reject) => {
			self.http.put(
					self.base + endpoint,
          data,
					this.buildOptions(options)
				)
				.subscribe(
          res => {
						var data = res.json();
						if(!data || data.status != 'success')
							return reject(data);

						return resolve(data);
  				},
          err => {
            if(err.status == 401 && err.json().loggedin === false){
              window.location.href="/login";
              return reject(err);
            }
            if(err.status != 200){
              return reject(err.json());
            }
          });
		});
	}

	/**
	 * Return a DELETE request
	 */
	delete(endpoint : string, data : Object = {}, options: Object = {}){
		var self = this;

		return new Promise((resolve, reject) => {
			self.http.delete(
					self.base + endpoint,
					this.buildOptions(options)
				)
				.subscribe(
          res => {
						var data = res.json();
						if(!data || data.status != 'success')
							return reject(data);

						return resolve(data);
				  },
          err => {
            if(err.status == 401 && err.json().loggedin === false){
              window.location.href="/login";
              return reject(err);
            }
            if(err.status != 200){
              return reject(err.json());
            }
          });
		});
	}
}
