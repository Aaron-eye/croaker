import UserModel from "./models/userModel";
import UserController from "./controllers/userController";
import overlayControllerFactory from "./controllers/overlayControllerFactory";

window.currentOverlay = null;

export default async () => {
  const userModel = new UserModel();
  const userController = new UserController(userModel);
  const signinOverlayController =
    await overlayControllerFactory.createFormOverlayController(
      "signin",
      userController.handleSignin.bind(userController)
    );
  const signupOverlayController =
    await overlayControllerFactory.createFormOverlayController(
      "signup",
      userController.handleSignup.bind(userController)
    );

  if (window.isSignedIn) {
    const signoutOverlayController =
      await overlayControllerFactory.createOverlayController("signout");

    const signoutConfirmContainer = signoutOverlayController.getElement();
    if (!signoutConfirmContainer)
      throw new Error("The signout confirm container doesn't exist!");
    const signoutYes = signoutConfirmContainer.querySelector(".yes-btn");
    const signoutNo = signoutConfirmContainer.querySelector(".no-btn");

    signoutYes?.addEventListener("click", (e) => {
      userController.handleSignout();
    });
    signoutNo?.addEventListener("click", (e) => {
      signoutOverlayController.close();
    });
  }

  return;
};
