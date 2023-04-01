import { IProfileInteractionsView } from "../types/users/profileInteractions";

export default class ProfileInteractionsView
  implements IProfileInteractionsView
{
  profileDetailsContainer: Element;
  followButton: Element | null;

  constructor(profileDetailsContainer: Element) {
    this.profileDetailsContainer = profileDetailsContainer;

    const followButton = this.profileDetailsContainer.querySelector(".follow");
    this.followButton = followButton;
  }

  checkFollow(followHandler: EventListener) {
    this.followButton?.addEventListener("click", followHandler);
  }

  updateFollow(followedByCurrentUser: boolean, amountOfFollowers: number) {
    if (this.followButton) {
      this.followButton.textContent = followedByCurrentUser
        ? "Unfollow"
        : "Follow";
    }

    const amountOfFollowersElement = this.profileDetailsContainer.querySelector(
      ".followers-amount"
    ) as HTMLElement;
    amountOfFollowersElement.textContent = String(amountOfFollowers);
  }
}
