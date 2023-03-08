import changeFloatingContainer from "../floating-container/changeFloatingContainer.js";

export default class FloatingContainerView {
  template: string;
  element: Element | null = null;
  baseElement: Element | null = null;
  closeBtn: Element | null | undefined;

  constructor(elementTemplate: string) {
    this.template = elementTemplate;
    //this.closeBtn = this.baseElement?.querySelector(".close");
  }

  addOpenListener(openingBtn: Element) {
    openingBtn.addEventListener("click", (e) => {
      console.log(1);
      e.stopPropagation();
      changeFloatingContainer(this);
      document.addEventListener("click", this._addOutsideClickListener);
      this._addCloseListener();
    });
  }

  _addOutsideClickListener = (event: Event) => {
    if (!(event.target as Element).closest(".floating-container-base")) {
      this._close();
    }
  };

  _close() {
    changeFloatingContainer(null);
    document.removeEventListener("click", this._addOutsideClickListener);
  }

  _addCloseListener() {
    this.closeBtn?.addEventListener("click", (e) => {
      this._close();
    });
  }
}
