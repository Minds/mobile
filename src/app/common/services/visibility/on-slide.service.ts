import { ElementRef } from "@angular/core";
import { Slides } from "ionic-angular";

import { VisibilityServiceInterface } from "./visibility-service.interface";
import { Subscription } from "rxjs/Subscription";

export class OnSlideService implements VisibilityServiceInterface {
  private bindings: {
    element: ElementRef,
    callback: Function,
    status: string | null,
  }[];

  private slider: Slides;
  private sliderEl: HTMLElement;

  sliderSubscription: Subscription;
  init(slider?: Slides) {
    if (!this.sliderSubscription && slider) {
      this.slider = slider;
      this.sliderEl = this.slider.getNativeElement();

      this.slider.ionSlideDidChange.subscribe((slider: Slides) => {
        this.onSlide(this.slider.getActiveIndex())
      });

      this.bindings = [];
    }

    if (this.slider) {
      this.onSlide(this.slider.getActiveIndex());
    }
  }

  refresh() {
    return this.init();
  }

  destroy() {
    if (this.sliderSubscription) {
      this.sliderSubscription.unsubscribe();
    }
  }

  register(element: ElementRef, callback: Function) {
    this.bindings.push({ element, callback, status: null });
  }

  unregister(element: ElementRef) {
    this.bindings = this.bindings.filter(binding => {
      return binding.element !== element;
    });
  }

  onSlide(index: number) {
    if (!index && index !== 0) {
      return;
    }

    this.bindings.forEach(binding => {
      const status = this._isActive(binding.element.nativeElement, index) ? this.VISIBLE : this.HIDDEN;

      if (status !== binding.status) {
        binding.status = status;
        binding.callback(status);
      }
    });
  }

  // Auxiliary
  private _isActive(element: HTMLElement, index: number) {
    if (!this.sliderEl || !element) {
      return false;
    }

    let indexEl: HTMLElement = <HTMLElement>this.sliderEl.querySelector(`ion-slide:nth-child(${index + 1}) .slide-zoom > *:first-child`);

    if (!indexEl) {
      indexEl = <HTMLElement>this.sliderEl.querySelector(`ion-slide:nth-child(${index + 1}) > *:first-child`);
    }

    if (!indexEl) {
      return false;
    }

    return element === indexEl;
  }

  // Constants
  readonly VISIBLE = '_VISIBLE';
  readonly HIDDEN = '_HIDDEN';
}
