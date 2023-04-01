import { IUserModel } from "../../types/users/user";

export default class UserModel implements IUserModel {
  userData = {};
  signedIn: boolean;

  constructor() {
    this.signedIn = false;
    const signinJSON = localStorage.getItem("signin");
    if (!signinJSON) return;

    const signinObj = JSON.parse(signinJSON);
    if (new Date() < new Date(signinObj.signinExpirationDate)) {
      this.signedIn = true;
    }
  }

  async setData(fields: any) {
    for (const property in fields) {
      const dataKey = property as keyof Object;
      this.userData[dataKey] = fields[dataKey];
    }
  }

  getData() {
    return this.userData;
  }
}
