import { NgModule } from '@angular/core';
import { CacheService } from './cache.service';

@NgModule({
  providers: [{
    provide: CacheService,
    useFactory: CacheService.ref,
    deps: []
  }]
})
export class CacheModule { }
