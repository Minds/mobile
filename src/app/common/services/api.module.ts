import { NgModule, NgZone } from '@angular/core';
import { HttpModule } from '@angular/http';
import { Storage } from './storage';
import { OAuth2 } from './api/oauth2';
import { SocketsService } from './api/sockets.service';

export { OAuth2 } from './api/oauth2';
export { SocketsService } from './api/sockets.service';

@NgModule({
  imports: [ HttpModule ],
  providers: [
    OAuth2,
    Storage,
    SocketsService,
  ]
})
export class ApiModule {}
