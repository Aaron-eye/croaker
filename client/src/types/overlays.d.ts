export interface IOverlayView extends Object {
  element: Element | null;
  display: Function;
  close: Function;
  addOpenTrigger: Function;
}

export interface IOverlayController extends Object {
  close: Function;
}
