import express from "express";
//import * as viewsController from "./../controllers/userController.js";
import * as authController from "./../controllers/authController.js";
import * as userController from "./../controllers/userController.js";

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/signin", authController.signin);
router.get("/signout", authController.signout);

router.get("/me/:fields?", userController.getMe, userController.getUser);

export default router;
