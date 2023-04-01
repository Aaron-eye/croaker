import { IUserInfoView } from "../types/users/userInfo";

export default class UserInfoView implements IUserInfoView {
  element: Element;

  constructor(element: Element) {
    this.element = element;
  }

  render(loaderContainer: Element) {
    loaderContainer.appendChild(this.element);
  }

  checkClick(clickCallback: EventListener) {
    this.element.addEventListener("click", clickCallback);
  }
}
