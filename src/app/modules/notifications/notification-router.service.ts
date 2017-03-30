import { App } from "ionic-angular";

import { MessengerList } from "../messenger/list.component";
import { MessengerView } from "../messenger/view.component";
import { NotificationsList } from "./list.component";
import { ChannelComponent } from "../channel/channel.component";
import { GroupProfile } from "../groups/profile.component";
import { CommentsList } from "../comments/list.component";
import { NewsfeedSingleComponent } from "../newsfeed/single.component";
import { BlogView } from "../blog/view.component";
import { DiscoveryView } from "../discovery/view.component";

export class NotificationRouterService {
  constructor(private app: App) { }

  private _navTo(...args) {
    setTimeout(() => this.app.getActiveNav().push.apply(this.app.getActiveNav(), args), 50)
  }

  route({ additionalData: { uri, json: data, foreground, coldstart } }) {
    if (!uri) {
      return;
    }

    if (foreground) {
      // @todo: maybe highlight notification bell?
      return;
    }

    // Navigate
    if (uri == 'chat') {
      if (!data || !data.entity_guid) {
        this._navTo(MessengerList, {});
        return;
      }

      // @todo: implement conversation view calling (w/ async loading via GUID)
      // e.g.: this._navTo(MessengerView, { guid:  });
      this._navTo(MessengerList, {});
    } else if (uri == 'notification') {
      if (!data || !data.entity_guid) {
        this._navTo(NotificationsList, {});
        return;
      }

      switch (data.type) {
        case 'friends':
          this._navTo(ChannelComponent, { guid: data.entity_guid })
          break;

        case 'group_invite':
          this._navTo(GroupProfile, { guid: data.entity_guid });
          break;

        case 'like': // not implemented in engine
        case 'downvote': // not implemented in engine
        case 'group_activity':
        case 'feature':
        case 'tag':
          let entity_type = data.entity_type.split(':');

          if (entity_type[0] === 'comment') {
            this._navTo(CommentsList, { guid: data.parent_guid });
          } else if (entity_type[0] === 'activity') {
            this._navTo(NewsfeedSingleComponent, { guid: data.entity_guid });
          } else if (entity_type[1] === 'blog') {
            this._navTo(BlogView, { guid: data.entity_guid });
          } else if (entity_type[0] === 'object') {
            this._navTo(DiscoveryView, { guid: data.entity_guid });
          } else {
            console.error('Unknown notification:', uri, data.type, entity_type, data);
          }

          break;

        case 'remind':
          this._navTo(NewsfeedSingleComponent, { guid: data.entity_guid });
          break;

        case 'comment':
          this._navTo(CommentsList, { guid: data.child_guid ? data.child_guid : data.entity_guid });
          break;

        default:
          this._navTo(NotificationsList, {});
          console.error('Unknown notification:', uri, data.type, data);
          break;

      } // @note: don't forget to add new types as they're implemented on notification card
    } else {
      console.error('Unknown notification:', uri, data);
    }
  }

  static _(app: App){
    return new NotificationRouterService(app);
  }
}
