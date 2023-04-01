import { IUserInfoController, IUserInfoView } from "../../types/users/userInfo";
import getNickname from "../../utils/users/getNickname";

export default class UserInfoController implements IUserInfoController {
  view: IUserInfoView;
  userNickname: string;

  constructor(view: IUserInfoView) {
    this.view = view;

    this.userNickname = getNickname(view.element);

    this.view.checkClick(this._handleClick.bind(this));
  }

  render(loaderContainer: Element) {
    this.view.render(loaderContainer);
  }

  _handleClick() {
    window.location.href = `/user/${this.userNickname}`;
  }
}
