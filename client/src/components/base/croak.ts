import { IFormController } from "../../types/form";
import overlayControllerFactory from "../overlayFactory";
import getUser from "../users/user";
import { IOverlayController } from "../../types/overlay";

interface ICroakControllers {
  croakForm: IFormController | null;
  croakOverlay: IOverlayController | null;
}

export const croakControllers: ICroakControllers = {
  croakForm: null,
  croakOverlay: null,
};

export default async () => {
  const { croakMaximumLength } = window.globalConfig;
  const userController = getUser();
  const signedIn = userController.checkSignedIn();

  if (signedIn) {
    await userController.setData(["nickname", "photo", "password"]);
    const user = userController.getData();

    // Croak
    const {
      formController: croakFormController,
      overlayController: croakOverlayController,
    } = await overlayControllerFactory.createFormOverlayController(
      "croak",
      userController.handleCroak.bind(userController),
      { currentUser: user }
    );

    if (croakFormController) {
      croakFormController.setFieldLimit("croakText", croakMaximumLength);
      croakFormController.limitInputLength(
        "croakText",
        "croak-counter",
        croakMaximumLength
      );

      croakControllers.croakForm = croakFormController;
    }

    if (croakOverlayController) {
      croakControllers.croakOverlay = croakOverlayController;
    }
  }
};
