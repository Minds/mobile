import { Injectable } from '@angular/core';

import { Client } from "./api/client";
import { Storage } from "./storage";
import { CONFIG } from "../../config";

@Injectable()
export class CurrentUserService {
  private _currentUser: Promise<any>;

  constructor(private client: Client, private storage: Storage) { }

  get(refresh?: boolean): Promise<any> {
    if (!refresh && this._currentUser) {
      return this._currentUser;
    }

    if (!refresh && this.storage.get('user')) {
      this._currentUser = Promise.resolve(this.storage.get('user'));
      return this._currentUser;
    }

    this._currentUser = this.client.get(`api/v1/channel/me`)
      .then((response: any) => {
        if (!response || !response.channel) {
          this.storage.destroy('user');
          throw new Error('No channel');
        }

        this.storage.set('user', response.channel);
        return response.channel;
      });

    return this._currentUser;
  }

  fetch(): this {
    this.get(true).catch(() => { });
    return this;
  }

  destroy(): this {
    this._currentUser = void 0;
    this.storage.destroy('user');

    return this;
  }

  asset(src, apply: boolean = false, unsafeUrls: boolean = false) {
    if (!src || !apply) {
      return src;
    }

    if (!unsafeUrls && src.indexOf(CONFIG.baseUrl) !== 0 && src.indexOf(CONFIG.cdnUrl) !== 0) {
      return;
    }

    src += src.indexOf('?') > -1 ? '&' : '?';
    src += 'access_token=' + this.storage.get('access_token');

    return src;
  }
}
