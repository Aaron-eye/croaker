import { IOverlayView, IOverlayController } from "../types/overlays";

export default class OverlayController implements IOverlayController {
  view: IOverlayView;

  constructor(OverlayView: IOverlayView) {
    this.view = OverlayView;
  }

  getElement() {
    return this.view.element;
  }

  addOpenTrigger(openingBtn: Element) {
    this.view.addOpenTrigger(openingBtn);
  }

  close() {
    this.view.close();
  }
}
