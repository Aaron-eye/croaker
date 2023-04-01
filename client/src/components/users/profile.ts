import ProfileInteractionsController from "../../controllers/users/profileInteractionsController";
import ProfileInteractionsModel from "../../models/users/profileInteractionsModel";
import { IProfileInteractionsController } from "../../types/users/profileInteractions";
import getNickname from "../../utils/users/getNickname";
import ProfileInteractionsView from "../../views/profileInteractionsView";

const profileContainer = document.querySelector(".profile");
const profileDetailsContainer = document.querySelector(".profile-details");

interface profileControllers {
  profileInteractionsController: IProfileInteractionsController | null;
}

export const profileControllers: profileControllers = {
  profileInteractionsController: null,
};

export default () => {
  if (profileContainer && profileDetailsContainer) {
    const userNickname = getNickname(profileContainer);

    const profileInteractionsModel = new ProfileInteractionsModel();
    const profileInteractionsView = new ProfileInteractionsView(
      profileDetailsContainer
    );
    profileControllers.profileInteractionsController =
      new ProfileInteractionsController(
        profileInteractionsModel,
        profileInteractionsView,
        userNickname
      );
  }
};
