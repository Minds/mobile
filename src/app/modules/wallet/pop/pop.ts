import { Injectable } from '@angular/core';
import { App, NavOptions, ViewController } from 'ionic-angular';

import { PopComponent } from './pop.component';

@Injectable()
export class Pop extends ViewController {

  private _app: App;

  constructor(app: App, private opts : any  = {}) {

    super(PopComponent, opts, null);
    this._app = app;
    this.isOverlay = true;
  }

  /**
   * Present the action sheet instance.
   *
   * @param {NavOptions} [opts={}] Nav options to go with this transition.
   * @returns {Promise} Returns a promise which is resolved when the transition has completed.
   */
  present(navOptions: NavOptions = {}) {
    return this._app.present(this, navOptions);
  }

}

@Injectable()
export class PopController {

  constructor(private _app: App) {}

  create(opts : any): Pop {
    return new Pop(this._app, opts);
  }

}
