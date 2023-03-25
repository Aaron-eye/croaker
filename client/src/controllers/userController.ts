import { IUserModel, IUserController } from "../types/user";
import overlayControllerFactory from "./overlayControllerFactory";

const setSignin = (signinRes: any) => {
  const signinObj = {
    signedIn: true,
    signinExpirationDate: signinRes.data.signinExpirationDate,
  };
  localStorage.setItem("signin", JSON.stringify(signinObj));
};

const removeSignin = () => {
  localStorage.removeItem("signin");
};

export default class UserController implements IUserController {
  model: IUserModel;
  constructor(model: IUserModel) {
    this.model = model;
  }

  async setData(keys: string[]) {
    await this.model.setData(keys);
    return;
  }

  checkSignedIn() {
    return this.model.signedIn;
  }

  getData() {
    return this.model.getData();
  }

  async handleCroak(data: any) {
    const croakRes = await this.model.croak(data);

    if (croakRes.data.status === "success") {
      window.setTimeout(() => {
        window.location.replace(
          `${window.location.origin}/user/${croakRes.data.data.userNickname}`
        );
      }, 0);
    }
    return;
  }

  async handleSignin(data: any) {
    const signedInContainer =
      await overlayControllerFactory.createOverlayController("signedIn");

    const signinRes = await this.model.signin(data);

    if (signinRes.data.status === "success") {
      signedInContainer?.display();

      setSignin(signinRes);

      window.setTimeout(() => {
        location.reload();
      }, 1500);
    }
    return;
  }

  async handleSignout() {
    const signoutRes = await this.model.signout();
    if (signoutRes.data.status == "success") {
      removeSignin();

      location.reload();
    }
  }

  async handleSignup(data: any) {
    const sginedUpController =
      await overlayControllerFactory.createOverlayController("accountCreated");

    const signupRes = await this.model.signup(data);
    if (signupRes?.data?.status === "success") {
      setSignin(signupRes);
      sginedUpController?.display();

      window.setTimeout(() => {
        location.reload();
      }, 1500);
    }
    return;
  }
}
