import { Injectable } from '@angular/core';
import { SQLite } from 'ionic-native';

import { Client } from '../../common/services/api/client';


@Injectable()
export class MessengerViewService {

  db : SQLite;
  guid : string;
  offset : string = "";
  publickeys = {};

  messages : Array<any> = [];

  constructor(private client : Client){
    this.db = new SQLite();
    this.db.openDatabase({name: "minds4.db", location: "default"})
      .then(() => {
        this.db.executeSql("CREATE TABLE IF NOT EXISTS messages (guid TEXT PRIMARY KEY, conversation_guid TEXT, data TEXT)", []);
      });
  }

  setGuid(guid : string){
    this.guid = guid;
  }

  get(limit : number = 10, offset : string = ""){
    return new Promise((resolve, reject) => {
      this.getFromLocal(limit, offset)
        .then((messages : Array<any>) => {
            resolve(messages);
        })
        .catch((err) => {
          console.log('error on local fetch, will try remote');
          console.log(err);

          this.getFromRemote(limit, offset)
            .then((messages : Array<any>) => {
              resolve(messages);
            })
            .catch((err) => {
              reject(err);
            })

        })
    });
  }

  getFromLocal(limit : number, offset : string = ""){
    return new Promise((resolve, reject) => {
      let request;

      if(offset){
        request = this.db.executeSql(`SELECT * FROM messages
          WHERE conversation_guid = ?
          AND guid < ?
          ORDER BY guid ASC
          LIMIT ? `,
          [ this.guid, offset, limit ])
      } else {
        request = this.db.executeSql(`SELECT * FROM messages
          WHERE conversation_guid = ?
          ORDER BY guid ASC
          LIMIT ? `,
          [ this.guid, limit ])
      }
        request.then((data) => {
          if(data.rows.length > 0) {
            let messages = [];
            for(var i = 0; i < data.rows.length; i++) {
              messages.push(JSON.parse(data.rows.item(i).data));
            }
            this.offset = messages[0].guid;
            console.log('got from local :' + this.offset);
            resolve(messages);

          } else {
            reject("No results on local");
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  getFromRemote(limit : number, offset : string = ""){
    return new Promise((resolve, reject) => {
      this.client.get('api/v2/conversations/' + this.guid, {
          limit: limit,
          offset: offset
        })
        .then((response : any) => {
          if(!response.messages){
            reject("No results on remote");
            return false;
          }

          //if(!response.publickeys){
          this.publickeys = response.publickeys;
          //}

          let messages = response.messages;

          //if(!this.offset)
          this.sync(response.messages);

          this.offset = response['load-previous'];

          resolve(messages);
        })
        .catch(() => {
        });
    });
  }

  sync(data){
    for(let item of data){
      this.db.executeSql("INSERT OR REPLACE INTO messages (guid, conversation_guid, data) VALUES (?, ?, ?)", [
        item.guid,
        this.guid,
        JSON.stringify(item)
      ])
        .then((success) => {
          console.log('sync success');
        })
        .catch((err) => {
          console.log('sync error');
          console.log(err);
        })
    }
  }


}
