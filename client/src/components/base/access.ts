import { IFormController } from "../../types/form";
import overlayControllerFactory from "../overlayFactory";
import getUser from "../users/user";
import { IOverlayController } from "../../types/overlay";

window.currentOverlay = null;

interface IAccessControllers {
  signoutOverlay: IOverlayController | null;
  signinOverlay: IOverlayController | null;
  signinForm: IFormController | null;
  signupOverlay: IOverlayController | null;
  signupForm: IFormController | null;
}

export const accessControllers: IAccessControllers = {
  signoutOverlay: null,
  signinOverlay: null,
  signinForm: null,
  signupOverlay: null,
  signupForm: null,
};

export default async () => {
  const { croakMaximumLength } = window.globalConfig;

  const userController = getUser();
  const signedIn = userController.checkSignedIn();

  if (signedIn) {
    // Signout
    const signoutOverlayController =
      await overlayControllerFactory.createOverlayController("signout", true);

    if (signoutOverlayController) {
      const signoutConfirmContainer = signoutOverlayController.getElement();
      if (!signoutConfirmContainer)
        throw new Error("The signout confirm container doesn't exist!");
      const signoutYes = signoutConfirmContainer.querySelector(".yes-btn");
      const signoutNo = signoutConfirmContainer.querySelector(".no-btn");

      signoutYes?.addEventListener("click", () => {
        userController.handleSignout();
      });
      signoutNo?.addEventListener("click", () => {
        signoutOverlayController.close();
      });

      accessControllers.signoutOverlay = signoutOverlayController;
    }
  }

  if (!signedIn) {
    // Signin
    const {
      formController: signinFormController,
      overlayController: signinOverlayController,
    } = await overlayControllerFactory.createFormOverlayController(
      "signin",
      userController.handleSignin.bind(userController)
    );
    if (signinFormController)
      accessControllers.signinForm = signinFormController;
    if (signinOverlayController)
      accessControllers.signinOverlay = signinOverlayController;

    // Signup
    const {
      formController: signupFormController,
      overlayController: signupOverlayController,
    } = await overlayControllerFactory.createFormOverlayController(
      "signup",
      userController.handleSignup.bind(userController)
    );
    if (signupFormController)
      accessControllers.signupForm = signupFormController;
    if (signupOverlayController)
      accessControllers.signupOverlay = signupOverlayController;
  }

  return;
};
