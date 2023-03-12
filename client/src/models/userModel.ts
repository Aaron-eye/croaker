import axios from "axios";
import { IUserModel } from "../types/user";

export default class UserModel implements IUserModel {
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
    const res = await axios({
      method: "POST",
      url: "/api/v1/users/signup",
      data,
    });
  }
}
