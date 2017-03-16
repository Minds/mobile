import { Component, ChangeDetectionStrategy, ChangeDetectorRef, Input, ViewChild, ElementRef, AfterViewInit, OnDestroy } from "@angular/core";
import { Platform } from "ionic-angular";

import { Storage } from '../../common/services/storage';
import { PlatformFeaturesService } from "../../common/services/platform-features.service";
import { Client } from "../../common/services/api/client";
import { VideoPlayerComponent } from "./video-player.component";

@Component({
  moduleId: 'module.id',
  selector: 'minds-video',
  templateUrl: './video.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'video',
})
export class VideoComponent implements AfterViewInit, OnDestroy {
  constructor(private changeDetectorRef: ChangeDetectorRef, private storage: Storage, private platformFeatures: PlatformFeaturesService, private client: Client, private platform: Platform) { }

  @ViewChild('nativeVideo') nativeVideo: ElementRef;

  @Input('thumbnail') thumbnail: string;
  @Input('muted') muted: boolean;
  @Input('loop') loop: boolean;

  @Input('analyticsGuid') analyticsGuid: any;

  preview: boolean = false;
  @Input('preview') set _preview(value) {
    if (this.isAutoplayRestricted()) {
      this.preview = false;
      this.detectChanges();
      return;
    }

    if (!value && this.preview) {
      this.stopPreview();
    }

    this.preview = !!value;
    this.detectChanges();
  };

  @Input('previewPlayback') set _previewPlayback(value) {
    if (value && !this.preview || this.isAutoplayRestricted()) {
      return;
    }

    if (value) {
      this.playPreview();
    } else {
      this.stopPreview();
    }
  }

  isPlayingPreview: boolean = false;

  sources: any[] = [];
  @Input('src') set _src(value: string | any[]) {
    const sources = [];

    if (typeof value === 'string') {
      sources.push(value);
    } else {
      sources.push(...value);
    }

    this.sources = sources;
    this.detectChanges();
  }

  autoplay: boolean = false;
  @Input('autoplay') set _autoplay(value: any) {
    let autoplay = !!value;

    if (this.isAutoplayRestricted()) {
      autoplay = false;
    }

    this.autoplay = autoplay;
    this.detectChanges();
  };

  isAutoplayRestricted(): boolean {
    return !this.storage.get('autoplay') || !this.platformFeatures.canPlayInlineVideo();
  }

  detectChanges() {
    this.changeDetectorRef.markForCheck();
    this.changeDetectorRef.detectChanges();
  }

  ngAfterViewInit() {
    this.listen();
  }

  ngOnDestroy() {
    this.unListen();
  }

  // Preview
  playPreview() {
    if (!this.nativeVideo) {
      return;
    }

    const player: HTMLVideoElement = this.nativeVideo.nativeElement;

    if (!player) {
      return;
    }

    this.isPlayingPreview = true;
    this.detectChanges();

    player.muted = true;
    player.play();
  }

  stopPreview() {
    if (!this.nativeVideo) {
      return;
    }

    const player: HTMLVideoElement = this.nativeVideo.nativeElement;

    if (!player) {
      return;
    }

    this.isPlayingPreview = false;
    this.detectChanges();

    player.muted = false;
    player.pause();
  }

  // Analytics

  private playRecorded: boolean = false;
  recordPlay() {
    if (this.playRecorded || this.isPlayingPreview) {
      return;
    }

    this.playRecorded = true;

    if (this.analyticsGuid) {
      this.client.put('api/v1/analytics/play/' + this.analyticsGuid);
    }
  }

  // Events

  private _eventsHandler;
  private _backButtonListenerUnregister;
  private _events = {
    'play': VideoComponent.EVENT_PLAY,
    'webkitfullscreenchange': VideoComponent.EVENT_FULLSCREEN,
    'fullscreenchange': VideoComponent.EVENT_FULLSCREEN,
  };

  listen() {
    this._eventsHandler = (ev: Event) => {
      return this.trigger(this._events[ev.type], ev);
    };

    for (let event in this._events) {
      this.nativeVideo.nativeElement.addEventListener(event, this._eventsHandler);
    }
  }

  unListen() {
    if (this._eventsHandler) {
      for (let event in this._events) {
        this.nativeVideo.nativeElement.removeEventListener(event, this._eventsHandler);
      }
    }

    if (this._backButtonListenerUnregister) {
      this._backButtonListenerUnregister();
      this._backButtonListenerUnregister = void 0;
    }
  }

  trigger(type: string, ev: Event) {
    switch (type) {
      case VideoComponent.EVENT_PLAY:
        this.recordPlay();
        break;

      case VideoComponent.EVENT_FULLSCREEN:
        if (this.isFullScreen()) {
          this.isPlayingPreview = false;
          this.nativeVideo.nativeElement.muted = false;

          if (this._backButtonListenerUnregister) {
            this._backButtonListenerUnregister();
          }

          this._backButtonListenerUnregister = this.platform.registerBackButtonAction((ev) => {
            this._backButtonListenerUnregister();
            this._backButtonListenerUnregister = void 0;

            this.exitFullScreen();
          }, 999);

          this.recordPlay();
        } else {
          if (this._backButtonListenerUnregister) {
            this._backButtonListenerUnregister();
            this._backButtonListenerUnregister = void 0;
          }
        }

        break;
    }

    this.detectChanges();
  }

  // Helpers
  isFullScreen() {
    if (!this.nativeVideo || !this.nativeVideo.nativeElement) {
      return false;
    }

    return this.nativeVideo.nativeElement.webkitDisplayingFullscreen ||
      this.nativeVideo.nativeElement.displayingFullscreen;
  }

  exitFullScreen() {
    if (!this.nativeVideo || !this.nativeVideo.nativeElement) {
      return false;
    }

    const player = this.nativeVideo.nativeElement,
      exit: Function = player.webkitExitFullscreen ||
        player.webkitExitFullScreen ||
        player.exitFullscreen ||
        player.exitFullScreen ||
        function () { };

    return exit.apply(player);
  }

  // Constants
  static readonly EVENT_PLAY = '_PLAY';
  static readonly EVENT_FULLSCREEN = '_FULLSCREEN';
}
