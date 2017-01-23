import { NgModule }     from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { AttachmentService } from './attachment.service';
import { Upload } from '../../common/services/api/upload';

@NgModule({
  imports: [ IonicModule ],
  providers: [
    AttachmentService,
    Upload
  ]
})
export class AttachmentModule { }
