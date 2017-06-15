import {Injectable} from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing';

@Injectable()
export class ShareService {
  constructor(private socialSharing: SocialSharing) {

  }

  share(message, subject, file, url){
    return this.socialSharing.share(message, subject, file, url);
  }

}
