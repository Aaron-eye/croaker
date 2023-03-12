import getTemplate from "../utils/getTemplate.js";
import overlayView from "../views/overlayView";
import { IFormController } from "./../types/form";
import { IOverlayView } from "../types/overlays";
import { IUserModel, IUserController } from "../types/user";

export default class UserController implements IUserController {
  model: IUserModel;
  constructor(model: IUserModel) {
    this.model = model;
  }

  async handleSignin(data: any) {
    const signedIn = await getTemplate("overlays/signedIn");
    let signedInContainer: IOverlayView | null = null;
    if (signedIn) signedInContainer = new overlayView(signedIn);

    const signinRes = await this.model.signin(data);

    if (signinRes.data.status === "success") {
      signedInContainer?.display();

      const signinObj = {
        signedIn: true,
        signinExpirationDate: signinRes.data.signinExpirationDate,
      };
      localStorage.setItem("signin", JSON.stringify(signinObj));

      window.setTimeout(() => {
        location.reload();
      }, 1500);
    }
    return;
  }

  async handleSignout() {
    const signoutRes = await this.model.signout();
    if (signoutRes.data.status == "success") {
      location.reload();
    }
  }

  async handleSignup(data: any) {
    const accountCreated = await getTemplate("overlays/accountCreated");
    let accountCreatedContainer: object | null = null;
    if (accountCreated)
      accountCreatedContainer = new overlayView(accountCreated);

    const signupRes = await this.model.signup(data);
    if (signupRes.data.status === "success") {
      window.setTimeout(() => {
        location.reload();
      }, 1500);
    }
    return;
  }
}
