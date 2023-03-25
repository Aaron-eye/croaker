import axios from "axios";
import { IUserModel } from "../types/user";

export default class UserModel implements IUserModel {
  userData = {};
  signedIn: boolean;

  constructor() {
    const signinJSON = localStorage.getItem("signin");
    if (!signinJSON) {
      this.signedIn = false;
      return;
    }
    const signinObj = JSON.parse(signinJSON);
    if (new Date() > signinObj.signinExpirationDate) {
      this.signedIn = false;
      return;
    }

    this.signedIn = true;
  }

  async setData(fields: string[]) {
    let unknownFields: string[] = [];
    fields.forEach((field) => {
      if (!this.userData[field as keyof Object]) unknownFields.push(field);
    });

    const stringedFields = unknownFields.join(",");
    const userReference = "me";
    const res = await axios({
      method: "GET",
      url: `/api/v1/users/${userReference}/${stringedFields}`,
    });

    const newData = res.data.data;
    for (const property in newData) {
      const dataKey = property as keyof Object;
      this.userData[dataKey] = newData[dataKey];
    }

    return;
  }

  getData() {
    return this.userData;
  }

  async croak(data: any) {
    return await axios({
      method: "POST",
      url: "/api/v1/croaks/croak",
      data,
    });
  }

  async signin(data: any) {
    return await axios({
      method: "POST",
      url: "/api/v1/users/signin",
      data,
    });
  }

  async signout() {
    return await axios({
      method: "GET",
      url: "/api/v1/users/signout",
    });
  }

  async signup(data: any) {
    return await axios({
      method: "POST",
      url: "/api/v1/users/signup",
      data,
    });
  }
}
