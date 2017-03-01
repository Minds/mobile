import { SocialSharing } from 'ionic-native';

export class ShareService {

  share(message, subject, file, url){
    return SocialSharing.share(message, subject, file, url);
  }

}
