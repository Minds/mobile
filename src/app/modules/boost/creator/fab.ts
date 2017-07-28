import { Injectable } from '@angular/core';
import { App, NavOptions, ViewController } from 'ionic-angular';

import { BoostCreatorComponent } from './creator.component';

@Injectable()
export class BoostCreatorFab extends ViewController {

  private _app: App;

  constructor(app: App, private opts: any = {}) {

    super(BoostCreatorComponent, opts, null);
    this._app = app;
    this.isOverlay = true;
  }

  present(navOptions: NavOptions = {}) {
    return this._app.present(this, navOptions);
  }

}

@Injectable()
export class BoostCreatorFabController {

  constructor(private _app: App) {
  }

  create(opts: any = {}): BoostCreatorFab {
    return new BoostCreatorFab(this._app, opts);
  }

}
