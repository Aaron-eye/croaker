import { IOverlayView } from "../types/overlays";

const overlayBlur = document.createElement("div");
overlayBlur.className = "overlay-blur";

export default class overlayView implements IOverlayView {
  element: Element | null = null;
  closeBtn: Element | null | undefined;

  constructor(elementTemplate: string) {
    let element = document.createElement("div");
    element.innerHTML = elementTemplate;
    this.element = element.firstChild as HTMLDivElement;
  }

  addOpenTrigger(openingBtn: Element) {
    openingBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      this.display();
    });
  }

  close(options = { overlayReplace: true }) {
    this.element?.remove();
    if (!options.overlayReplace) {
      overlayBlur.remove();
      document.removeEventListener("click", this._addOutsideClickListener);
      this.closeBtn = null;
      window.currentOverlay = null;
    }
  }

  display() {
    if (window.currentOverlay) {
      window.currentOverlay.close();
    } else {
      document.body.appendChild(overlayBlur);
      document.addEventListener("click", this._addOutsideClickListener);
    }

    if (this.element) {
      document.body.appendChild(this.element);
      this.closeBtn = this.element?.querySelector(".close");
      this._addCloseListener();
      window.currentOverlay = this;
    }
  }

  _addOutsideClickListener = (event: Event) => {
    if (!(event.target as Element).closest(".overlay-base")) {
      this.close({ overlayReplace: false });
    }
  };

  _addCloseListener() {
    this.closeBtn?.addEventListener("click", (e) => {
      this.close({ overlayReplace: false });
    });
  }
}
