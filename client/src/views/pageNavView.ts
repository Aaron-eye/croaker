import { IPageNavView } from "../types/pageNav";

const currentUrl = window.location.href;

export default class PageNavView implements IPageNavView {
  element: Element;

  constructor(element: Element) {
    this.element = element;

    this._activateCurrentLink();
  }

  _activateCurrentLink() {
    const navLinks = this.element.querySelectorAll("a");
    for (var i = 0; i < navLinks.length; i++) {
      var link = navLinks[i];

      if (link.href === currentUrl) link.classList.add("active");
    }
  }
}
