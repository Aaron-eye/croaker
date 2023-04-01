import { IOverlayView, IOverlayController } from "../types/overlay";

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

  close(options = { overlayReplace: false }) {
    this.view.close(options);
  }

  render() {
    this.view.render();
  }

  async displayGenericError(err: any) {
    await this.view.displayGenericError(err);
    return;
  }
}
