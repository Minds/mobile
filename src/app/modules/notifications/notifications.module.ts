import { NgModule }     from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { CommonModule } from '../../common/common.module';
import { HeaderModule } from '../header/header.module';
import { Client } from '../../common/services/api/client';
import { NotificationsList } from './list.component';
import { NotificationCard } from './card/card.component';


@NgModule({
  imports: [ IonicModule, CommonModule, HeaderModule ],
  providers: [ Client ],
  declarations: [ NotificationsList, NotificationCard ],
  exports: [ NotificationsList, NotificationCard ],
  entryComponents: [ NotificationsList ]
})
export class NotificationsModule { }
