import overlayControllerFactory from "./controllers/overlayControllerFactory";

window.currentOverlay = null;

export default async () => {
  /*const data = await userController.getData("me", [
    "nickname",
    "photo",
    "password",
  ]);
  console.log(data);*/

  const { croakMaximumLength } = window.globalConfig;

  console.log(window.isSignedIn);

  const userController = window.userController;

  if (window.isSignedIn) {
    await userController.setData(["nickname", "photo", "password"]);
    const basicUserData = userController.getData();
    console.log(basicUserData);

    const {
      overlayController: croakOverlayController,
      formController: croakFormController,
    } = await overlayControllerFactory.createFormOverlayController(
      "croak",
      userController.handleCroak.bind(userController),
      { currentUser: basicUserData }
    );

    croakFormController.setFieldLimit("croakText", croakMaximumLength);
    croakFormController.setInputCounter(
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
