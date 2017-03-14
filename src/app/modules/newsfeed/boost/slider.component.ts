import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, AfterViewInit } from "@angular/core";
import { Slides } from "ionic-angular";

import { Client } from "../../../common/services/api/client";

@Component({
  moduleId: 'module.id',
  selector: 'boost-slider',
  templateUrl: 'slider.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoostSliderComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('slider') private slider: Slides;

  FETCH_LIMIT: number = 15;
  MAX_BULLETS: number = 15; // max number of bullets allowed

  boosts: any[] = [];

  inProgress: boolean = false;
  shallUpdateSlider: boolean = true;

  paginationType: string = 'bullets';

  private recordImpressionTimer;
  private updateTimer;

  constructor(private client: Client, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.load(true);
  }

  ngAfterViewInit() {
    this.slider.autoHeight = true;
  }

  ngOnDestroy() {
    this.unListen();

    if (this.recordImpressionTimer) {
      clearTimeout(this.recordImpressionTimer);
    }
  }

  load(refresh: boolean = false) {
    if (this.inProgress) {
      return;
    }

    const limit: number = this.FETCH_LIMIT;

    if (refresh) {
      this.boosts = [];

      this.unListen();
    }

    this.inProgress = true;

    this.detectChanges();

    return this.client.get('api/v1/boost/fetch/newsfeed', { limit })
      .then(({ boosts = [] }) => {
        this.inProgress = false;
        this.boosts.push(...boosts);

        this.detectChanges();
        this.listen();

        if (refresh) {
          this.recordImpression();
        }

        return boosts;
      })
      .catch(e => {
        this.inProgress = false;

        this.detectChanges();
        throw e;
      });
  }

  recordImpression() {
    if (!this.boosts || this.boosts.length === 0) {
      return;
    }

    const index = this.slider.getActiveIndex(),
      slide = this.boosts[index];

    if (this.recordImpressionTimer) {
      clearTimeout(this.recordImpressionTimer);
    }

    this.recordImpressionTimer = setTimeout(() => {
      this.recordImpressionTimer = null;

      if (!slide.boosted_guid) {
        return;
      }

      this.client.put(`api/v1/boost/fetch/newsfeed/${slide.boosted_guid}`)
        .then(() => { })
        .catch(() => { });
    }, 1000);
  }

  updateSlider() {
    if (!this.shallUpdateSlider) {
      return;
    }

    this.slider.update();
  }

  refresh() {
    this.slider.slideTo(0);
    setTimeout(() => this.load(true), 100);
  }

  onSlideChange() {
    this.unListen(); // no need to keep monitoring size
    this.recordImpression();

    if (this.boosts && this.boosts.length > 0 && this.slider.isEnd()) {
      this.slider.lockSwipes(true);
      this.load()
        .then(() => {
          this.trimSlider();
          this.slider.lockSwipes(false);
        })
        .catch(() => {
          this.slider.lockSwipes(false);
        });
    }
  }

  trimSlider() {
    if (this.boosts.length < this.MAX_BULLETS) {
      return;
    }

    const end = this.slider.getActiveIndex(); // zero-based

    if (end === 0) {
      return;
    }

    this.boosts.splice(0, end);
    this.detectChanges();

    setTimeout(() => {
      this.slider.update();
      this.slider.slideTo(0, 0, false);
    }, 0);
  }

  detectChanges() {
    this.changeDetectorRef.markForCheck();
    this.changeDetectorRef.detectChanges();
  }

  listen() {
    this.shallUpdateSlider = true;

    if (this.updateTimer) {
      return;
    }

    this.updateTimer = setInterval(() => this.updateSlider(), 2500);
    setTimeout(() => this.updateSlider(), 500);
  }

  unListen() {
    if (this.updateTimer) {
      clearTimeout(this.updateTimer);
      this.updateTimer = void 0;
    }
  }
}
