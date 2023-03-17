import axios from "axios";
import { IUserModel } from "../types/user";

export default class UserModel implements IUserModel {
  userData = {};

  async setData(fields: string) {
    const userReference = "me";
    const res = await axios({
      method: "GET",
      url: `/api/v1/users/${userReference}/${fields}`,
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
