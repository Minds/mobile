import { Injectable } from '@angular/core';
import { Platform } from "ionic-angular";

@Injectable()
export class AppStatusService {
  private _isActive: boolean = true;

  constructor(private platform: Platform) { }

  setUp() {
    this.platform.pause.subscribe(() => {
      this._isActive = false;
    });

    this.platform.resume.subscribe(() => {
      this._isActive = true;
    });
  }

  isActive() {
    return this._isActive;
  }
}
