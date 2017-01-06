import { NgModule }     from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { Client } from '../../common/services/api/client';
import { NotificationsList } from './list.component';
import { NotificationCard } from './card/card.component';


@NgModule({
  imports: [ IonicModule ],
  providers: [ Client ],
  declarations: [ NotificationsList, NotificationCard ],
  exports: [ NotificationsList, NotificationCard ],
  entryComponents: [ NotificationsList ]
})
export class NotificationsModule { }
