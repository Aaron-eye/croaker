import UserModel from "../models/userModel";
import UserController from "../controllers/userController";

const userModel = new UserModel();
const userController = new UserController(userModel);

export default () => {
  return userController;
};
