import axios from "axios";
import getUser from "../../components/users/user";
import {
  IProfileInteractionsController,
  IProfileInteractionsModel,
  IProfileInteractionsView,
} from "../../types/users/profileInteractions";
import getAmountOfFollowers from "../../utils/users/getAmountOfFollowers";
import redirectToSignin from "../../utils/users/redirectToSignin";

const userController = getUser();
const signedIn = userController.checkSignedIn();

export default class ProfileInteractionsController
  implements IProfileInteractionsController
{
  model: IProfileInteractionsModel;
  view: IProfileInteractionsView;
  userNickname: string;

  constructor(
    model: IProfileInteractionsModel,
    view: IProfileInteractionsView,
    userNickname: string
  ) {
    this.model = model;
    this.view = view;
    this.userNickname = userNickname;

    const isFollowedByCurrentUser =
      (view.profileDetailsContainer as HTMLElement).dataset
        .isFollowedByCurrentUser === "true";
    this.model.followedByCurrentUser = isFollowedByCurrentUser;

    const amountOfFollowers = getAmountOfFollowers(
      view.profileDetailsContainer
    );
    this.model.amountOfFollowers = amountOfFollowers;

    view.updateFollow(isFollowedByCurrentUser, amountOfFollowers);
    view.checkFollow(this._followHandler.bind(this));
  }

  async _followHandler(e: Event) {
    e.stopPropagation();
    if (this.model.resolvingFollow) return;
    this.model.resolvingFollow = true;

    if (!signedIn) {
      redirectToSignin("You need to be signed in to follow other people!");
      return;
    }

    this.model.changeFollowValues();
    this.view.updateFollow(
      this.model.followedByCurrentUser,
      this.model.amountOfFollowers
    );

    const followOperation = this.model.followedByCurrentUser
      ? "follow"
      : "unfollow";

    const followReq = await axios({
      method: "POST",
      url: `/api/v1/users/${followOperation}/${this.userNickname}`,
    });

    this.model.resolvingFollow = false;
  }
}
