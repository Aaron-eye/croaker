import UserModel from "./models/userModel";
import UserController from "./controllers/userController";

export default () => {
  const userModel = new UserModel();
  const userController = new UserController(userModel);
  return userController;
};
