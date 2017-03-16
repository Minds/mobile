import { ElementRef } from "@angular/core";
import { Content } from "ionic-angular";

import { Subscription } from "rxjs/Subscription";
import 'rxjs/add/operator/debounceTime';

import { VisibilityServiceInterface } from "./visibility-service.interface";

export class OnScreenService implements VisibilityServiceInterface {
  // Time threshold for scroll-end event to hit
  static readonly SCROLL_DEBOUNCE_MS = 1250;

  private scrollArea: Content;

  private bindings: {
    element: ElementRef,
    callback: Function,
    inViewport: string | null,
  }[];

  private _scrollSubscription: Subscription;
  init(scrollArea?: Content) {
    if (!this._scrollSubscription && scrollArea) {
      this.scrollArea = scrollArea;

      this._scrollSubscription = this.scrollArea.ionScrollEnd
        .debounceTime(OnScreenService.SCROLL_DEBOUNCE_MS)
        .subscribe($event => {
          const { scrollTop, scrollHeight } = $event;
          this.onScroll(scrollTop, scrollHeight);
        });

      this.bindings = [];
    }

    if (this.scrollArea) {
      this.onScroll(0, this.scrollArea.scrollHeight);
    }
  }

  refresh() {
    return this.init();
  }

  destroy() {
    if (this._scrollSubscription) {
      this._scrollSubscription.unsubscribe();
      this._scrollSubscription = void 0;
    }
  }

  onScroll(top: number, height: number) {
    if (height <= 0) {
      return;
    }

    this.bindings.forEach(binding => {
      const inViewport = this._isInViewport(binding.element.nativeElement, { top, height }) ? this.VISIBLE : this.HIDDEN;

      if (inViewport !== binding.inViewport) {
        binding.inViewport = inViewport;
        binding.callback(inViewport);
      }
    });
  }

  register(element: ElementRef, callback: Function) {
    this.bindings.push({ element, callback, inViewport: null });
  }

  unregister(element: ElementRef) {
    this.bindings = this.bindings.filter(binding => {
      return binding.element !== element;
    });
  }

  // Auxiliar
  private _isInViewport(element: HTMLElement | null, { top, height }) {
    if (!element) {
      return false;
    }

    const bottom = top + (height * 0.75),
      elTop = element.offsetTop,
      elBottom = elTop + element.offsetHeight;

    let hidden = (top > elBottom) || (bottom < elTop);

    return !hidden;
  }

  // Constants
  readonly VISIBLE = '_VISIBLE';
  readonly HIDDEN = '_HIDDEN';
}
