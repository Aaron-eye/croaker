import { accessControllers } from "../../components/base/access";

export default async (errorMessage: string) => {
  const signinOverlayController = accessControllers.signinOverlay;
  if (signinOverlayController) {
    signinOverlayController.render();
    await signinOverlayController.displayGenericError(new Error(errorMessage));
  }
};
