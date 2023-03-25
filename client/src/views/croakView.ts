import { ICroakView } from "../types/croak";

export default class CroakView implements ICroakView {
  engagementContainer: Element;
  element: Element;

  constructor(elementString: string) {
    const element = document.createElement("div");
    element.innerHTML = elementString.trim();
    this.element = element;

    const engagementContainer = element.querySelector(".engagements");
    if (!engagementContainer) throw new Error("No engagement container found!");
    this.engagementContainer = engagementContainer;
  }

  currentUserEngage(
    engagementType: string,
    engage: boolean | string = "toggle"
  ) {
    const engagementElement = this.getEngagementElement(engagementType);

    if (engage == "toggle") engagementElement.classList.toggle("engaged");
    else if (engage) engagementElement.classList.add("engaged");
    else engagementElement.classList.remove("engaged");
  }

  render(croakContainer: Element) {
    croakContainer.appendChild(this.element);
  }

  updateEngagement(engagementType: string, newEngagementValue: number) {
    const currentEngagement = this.getEngagementElement(engagementType);
    const engagementNumber =
      currentEngagement.querySelector(".engagement-number");
    if (!engagementNumber) throw new Error("No engagement number span found!");

    engagementNumber.textContent = String(newEngagementValue);
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
