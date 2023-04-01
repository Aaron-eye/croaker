export interface IOverlayView extends Object {
  element: Element | null;
  render: Function;
  close: Function;
  addOpenTrigger: Function;
  displayGenericError: Function;
}

export interface IOverlayController extends Object {
  close: Function;
  getElement: Function;
  render: Function;
  displayGenericError: Function;
}
