import { Injectable } from '@angular/core';
import { Platform } from "ionic-angular";
import { ReplaySubject, Subscription } from "rxjs/Rx";

@Injectable()
export class AppStatusService {
  private _isActive: boolean = true;
  private _activationStatus = new ReplaySubject();
  private _activationTimer: any;

  constructor(private platform: Platform) { }

  setUp() {
    this.platform.pause.subscribe(() => {
      if (this._activationTimer) {
        clearTimeout(this._activationTimer);
        this._activationTimer = void 0;
      }

      this._isActive = false;
      this._activationStatus.next({ status: this._isActive });
    });

    this.platform.resume.subscribe(() => {
      if (this._activationTimer) {
        return;
      }

      this._activationTimer = setTimeout(() => {
        this._activationTimer = void 0;
        this._isActive = true;
        this._activationStatus.next({ status: this._isActive });
      }, 1500)
    });
  }

  isActive() {
    return this._isActive;
  }

  waitUntilActivates(): Promise<any> {
    if (this._isActive) {
      return Promise.resolve(true);
    }

    return new Promise((resolve) => {
      let _activationStatusSubscription: Subscription;

      _activationStatusSubscription = this._activationStatus.subscribe(({ status }) => {
        if (!status) {
          return;
        }

        if (_activationStatusSubscription) {
          _activationStatusSubscription.unsubscribe();
          _activationStatusSubscription = void 0;
        }

        resolve(true);
      });
    });
  }
}
