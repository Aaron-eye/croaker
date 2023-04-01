import { IProfileInteractionsModel } from "../../types/users/profileInteractions";

export default class ProfileInteractionsModel
  implements IProfileInteractionsModel
{
  followedByCurrentUser = false;
  resolvingFollow = false;
  amountOfFollowers = 0;

  changeFollowValues() {
    this.followedByCurrentUser = !this.followedByCurrentUser;
    this.amountOfFollowers =
      this.amountOfFollowers + (this.followedByCurrentUser ? 1 : -1);
  }
}
