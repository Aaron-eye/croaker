import { ICroakView } from "../types/croak";

export default class CroakView implements ICroakView {
  element: Element;
  engagementContainer: Element;

  constructor(element: Element) {
    this.element = element;

    const engagementContainer = this.element.querySelector(".engagements");
    if (!engagementContainer) throw new Error("No engagement container found!");
    this.engagementContainer = engagementContainer;
  }

  render(loaderContainer: Element) {
    loaderContainer.appendChild(this.element);
  }

  checkLike(likeCallback: EventListener) {
    const likeBtn = this.element.querySelector(".like");
    likeBtn?.addEventListener("click", likeCallback);
  }

  getEngagementElement(engagementType: string) {
    const engagementElement = this.engagementContainer.querySelector(
      `.${engagementType}`
    );
    if (!engagementElement)
      throw new Error(`No ${engagementType} engagement found!`);

    return engagementElement;
  }
}
