import { NgModule } from '@angular/core';
import { CacheService } from './cache.service';

@NgModule({
  providers: [{
    provide: CacheService,
    useFactory: () => {
      return new CacheService
    },
    deps: []
  }]
})
export class CacheModule { }
