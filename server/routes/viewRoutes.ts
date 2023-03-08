import express from "express";
import * as viewsController from "./../controllers/viewsController.js";
import * as authController from "../controllers/authController.js";

const router = express.Router();

router.get("/");
router.get("/:page", viewsController.getPage);
//router.get("/user/:nickname", viewsController.getUserPage);
router.get("/user/:nickname/:userPage?", viewsController.getUserPage);

export default router;
