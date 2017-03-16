import { ElementRef } from "@angular/core";

export interface VisibilityServiceInterface {
  init(...args: any[]);
  refresh();
  destroy();
  register(element: ElementRef, callback: Function);
  unregister(element: ElementRef);

  readonly VISIBLE;
  readonly HIDDEN;
}
