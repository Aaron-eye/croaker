import { IUserModel, IUserController } from "../../types/users/user";
import overlayControllerFactory from "../../components/overlayFactory";
import axios from "axios";

const setSignin = (signinRes: any) => {
  const signinObj = {
    signedIn: true,
    signinExpirationDate: signinRes.data.data.signinExpirationDate,
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
    if (this.model.signedIn) {
      let unknownFields: string[] = [];

      keys.forEach((field) => {
        if (!this.model.userData[field as keyof Object])
          unknownFields.push(field);
      });

      try {
        const stringedFields = unknownFields.join(",");
        const userReference = "me";
        const res = await axios({
          method: "GET",
          url: `/api/v1/users/${userReference}/${stringedFields}`,
        });

        const newData = res.data.data;
        this.model.setData(newData);
      } catch (err) {
        if (err.response.status == 401) {
          removeSignin();
          location.reload();
        }
      }
    }
    return;
  }

  checkSignedIn() {
    return this.model.signedIn;
  }

  getData() {
    return this.model.getData();
  }

  async handleCroak(data: any) {
    const croakRes = await axios({
      method: "POST",
      url: "/api/v1/croaks/croak",
      data,
    });

    if (croakRes.data.status === "success") {
      window.setTimeout(() => {
        window.location.href = `${window.location.origin}/user/${croakRes.data.data.userNickname}`;
      }, 0);
    }
    return;
  }

  async handleSignin(data: any) {
    const signedInContainer =
      await overlayControllerFactory.createOverlayController("signedIn");

    const signinRes = await axios({
      method: "POST",
      url: "/api/v1/users/signin",
      data,
    });

    if (signinRes.data.status === "success") {
      signedInContainer?.render();

      setSignin(signinRes);

      window.setTimeout(() => {
        location.reload();
      }, 1500);
    }
    return;
  }

  async handleSignout() {
    const signoutRes = await axios({
      method: "GET",
      url: "/api/v1/users/signout",
    });

    if (signoutRes.data.status == "success") {
      removeSignin();

      location.reload();
    }
  }

  async handleSignup(data: any) {
    const sginedUpController =
      await overlayControllerFactory.createOverlayController("accountCreated");

    const signupRes = await axios({
      method: "POST",
      url: "/api/v1/users/signup",
      data,
    });

    if (signupRes?.data?.status === "success") {
      setSignin(signupRes);
      sginedUpController?.render();

      window.setTimeout(() => {
        location.reload();
      }, 1500);
    }
    return;
  }
}
