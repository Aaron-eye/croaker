import getEngagementIcon from "../utils/getEngagementIcon";

export default class EngagementView {
  type: string;
  element: Element;

  constructor(element: Element) {
    this.element = element;
    this.type = "undefined type";
  }

  async renderIcon() {
    const engagementElement = this.element;

    const engagementIconElement =
      engagementElement.querySelector(".engagement-icon");
    if (!engagementIconElement)
      throw new Error(
        `The ${this.type}'s engagement icon element doest't exist!`
      );

    if (engagementElement.classList.contains("engaged")) {
      engagementIconElement.innerHTML = await getEngagementIcon(
        `${this.type}-solid` as keyof Object
      );
    } else {
      engagementIconElement.innerHTML = await getEngagementIcon(
        this.type as keyof Object
      );
    }
    return;
  }

  updateNumber(newEngagementValue: number) {
    const currentEngagement = this.element;
    const engagementNumber =
      currentEngagement.querySelector(".engagement-number");
    if (!engagementNumber) throw new Error("No engagement number span found!");

    engagementNumber.textContent = String(newEngagementValue);
  }

  async currentUserEngage(engage: boolean) {
    const engagementElement = this.element;

    if (engage) {
      engagementElement.classList.add("engaged");
    } else {
      engagementElement.classList.remove("engaged");
    }

    await this.renderIcon();
    return;
  }
}
