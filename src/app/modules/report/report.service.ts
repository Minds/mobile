import { Injectable } from '@angular/core';
import { ActionSheetController } from 'ionic-angular';
import { Client } from '../../common/services/api/client';


@Injectable()
export class ReportService {

  constructor(private client : Client, private actionSheetCtrl : ActionSheetController){}

  report(guid){

    let buttons = [
      {
        text: 'It\'s spam',
        handler: () => this.send(guid, 'spam')
      },
      {
        text: "It displays a sensitive image",
        handler: () => this.send(guid, 'sensitive')
      },
      {
        text: 'It\'s abusive or harmful',
        handler: () => this.send(guid, 'abusive')
      },
      {
        text: 'It shouldn\'t be on Minds',
        handler: () => this.send(guid, 'annoying')
      },
      {
        text: 'Cancel',
        role: 'cancel'
      }
    ];

    let actionSheet = this.actionSheetCtrl.create({
      buttons: buttons
    });
    actionSheet.present();
  }

  send(guid, reason){
    this.client.post('api/v1/entities/report/' +guid, { subject: reason });
  }

}
