import UserModel from "../../models/users/userModel";
import UserController from "../../controllers/users/userController";

const userModel = new UserModel();
const userController = new UserController(userModel);

export default () => {
  return userController;
};
