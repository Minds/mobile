import { Component, OnInit, OnDestroy, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

import { ChannelComponent } from '../channel/channel.component';
import { Client } from '../../common/services/api/client';
import { Storage } from '../../common/services/storage';


@Component({
  moduleId: 'module.id',
  selector: 'translation-view',
  templateUrl: 'view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TranslationViewComponent {

  constructor(private client : Client, private params : NavParams, private viewCtrl : ViewController, private cd : ChangeDetectorRef ){
  }

  @Input() set language(language : string){
    if(language)
      this.translate(language);
  }
  @Input() guid : string;

  translation;

  translate(language : string){
    this.client.get(`api/v1/translation/translate/${this.guid}`, { target: language })
      .then((response: any) => {

        this.translation = response.translation;
        this.cd.markForCheck();
        this.cd.detectChanges();
      });
  }

}
