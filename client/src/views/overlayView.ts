import createErrorElement from "../utils/errors/createErrorElement";
import { IOverlayView } from "../types/overlay";

const overlayBlur = document.createElement("div");
overlayBlur.className = "overlay-blur";

export default class overlayView implements IOverlayView {
  element: Element;
  genericErrorContainer: Element;
  closeBtn: Element | null | undefined;

  constructor(elementTemplate: string) {
    let parentElement = document.createElement("div");
    parentElement.innerHTML = elementTemplate;
    const element = parentElement.firstChild as HTMLDivElement;
    if (!element) throw new Error("No overlay base element found!");
    this.element = element;

    const overlayElement = element.querySelector(".overlay");
    if (!overlayElement) throw new Error("No overlay element found!");

    const genericErrorContainer = document.createElement("div");
    overlayElement.insertAdjacentElement("afterbegin", genericErrorContainer);
    this.genericErrorContainer = genericErrorContainer;
  }

  addOpenTrigger(openingBtn: Element) {
    openingBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      this.render();
    });
  }

  close(options = { overlayReplace: false }) {
    this.element.remove();
    if (!options.overlayReplace) {
      overlayBlur.remove();
      document.removeEventListener("click", this._addOutsideClickListener);
      this.closeBtn = null;
      window.currentOverlay = null;
    }
  }

  render() {
    this._removeGenericError();

    if (window.currentOverlay) {
      window.currentOverlay.close({ overlayReplace: true });
    } else {
      document.body.appendChild(overlayBlur);
      document.addEventListener("click", this._addOutsideClickListener);
    }

    document.body.appendChild(this.element);
    this.closeBtn = this.element?.querySelector(".close");
    this._addCloseListener();
    window.currentOverlay = this;
  }

  async displayGenericError(err: any) {
    const errorElement = await createErrorElement(err);
    this._removeGenericError();
    this.genericErrorContainer.appendChild(errorElement);
  }

  _removeGenericError() {
    this.genericErrorContainer.innerHTML = "";
  }

  _addOutsideClickListener = (event: Event) => {
    if (!(event.target as Element).closest(".overlay-base")) {
      this.close();
    }
  };

  _addCloseListener() {
    this.closeBtn?.addEventListener("click", (e) => {
      this.close();
    });
  }
}
