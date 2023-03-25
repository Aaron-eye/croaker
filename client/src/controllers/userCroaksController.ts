/*import axios from "axios";
import loadData from "../utils/loadData";
import { IUserCroaksModel } from "../types/croaks";
import CroaksController from "./croaksController";

interface IUser extends Object {
  nickname: string;
}

export default class UserCroaksController extends CroaksController {
  model: IUserCroaksModel;
  constructor(model: IUserCroaksModel) {
    super();
    this.model = model;
  }

  loadUserCroaks = async (user: IUser) => {
    const userCroaksRes = await loadData(async () => {
      return axios({
        method: "GET",
        url: `/api/v1/croaks/user/${user.nickname}/startingPoint/${this.model.croakLoaderStartingPoint}`,
      });
    }, this.contentLoader);

    const userCroaks = userCroaksRes.data.data;
    userCroaksContainer.insertAdjacentHTML("beforeend", userCroaks.join(""));
    croakLoaderStartingPoint += userCroaks.length;
  };
}
*/
