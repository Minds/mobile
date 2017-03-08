import { Injectable } from '@angular/core';
import { App, NavOptions, ViewController } from 'ionic-angular';

import { WireFabComponent } from './fab.component';

@Injectable()
export class WireFab extends ViewController {

  private _app: App;

  constructor(app: App, private opts : any  = {}) {

    super(WireFabComponent, opts, null);
    this._app = app;
    this.isOverlay = true;
  }

  present(navOptions: NavOptions = {}) {
    return this._app.present(this, navOptions);
  }

}

@Injectable()
export class WireFabController {

  constructor(private _app: App) {}

  create(opts : any): WireFab {
    return new WireFab(this._app, opts);
  }

}
