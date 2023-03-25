import overlayControllerFactory from "./controllers/overlayControllerFactory";
import getUser from "./utils/getUser";

window.currentOverlay = null;

export default async () => {
  /*const data = await userController.getData("me", [
    "nickname",
    "photo",
    "password",
  ]);
  console.log(data);*/

  const { croakMaximumLength } = window.globalConfig;

  const userController = getUser();
  const signedIn = userController.checkSignedIn();

  if (signedIn) {
    await userController.setData(["nickname", "photo", "password"]);
    const user = userController.getData();

    const {
      overlayController: croakOverlayController,
      formController: croakFormController,
    } = await overlayControllerFactory.createFormOverlayController(
      "croak",
      userController.handleCroak.bind(userController),
      { currentUser: user }
    );

    croakFormController.setFieldLimit("croakText", croakMaximumLength);
    croakFormController.limitInputLength(
      "croakText",
      "croak-counter",
      croakMaximumLength
    );

    //Signout
    const signoutOverlayController =
      await overlayControllerFactory.createOverlayController("signout", true);

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
  } else {
    await overlayControllerFactory.createFormOverlayController(
      "signin",
      userController.handleSignin.bind(userController)
    );
    await overlayControllerFactory.createFormOverlayController(
      "signup",
      userController.handleSignup.bind(userController)
    );
  }

  return;
};
