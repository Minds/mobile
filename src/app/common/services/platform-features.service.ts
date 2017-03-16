import { Injectable } from '@angular/core';
import { Platform } from "ionic-angular";

@Injectable()
export class PlatformFeaturesService {
  constructor(private platform: Platform) { }

  private canPlayInlineVideoCache: boolean | null = null;
  canPlayInlineVideo() {
    if (this.canPlayInlineVideoCache !== null) {
      return this.canPlayInlineVideoCache;
    }

    let ability = true;

    if (this.platform.is('ios')) {
      ability = matchMedia('(-webkit-video-playable-inline)').matches || matchMedia('(video-playable-inline)').matches;
    }

    this.canPlayInlineVideoCache = ability;
    return this.canPlayInlineVideoCache;
  }
}
