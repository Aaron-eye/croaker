import express from "express";
import * as viewsController from "./../controllers/viewsController.js";
import * as authController from "../controllers/authController.js";

const router = express.Router();

router.get("/user/:nickname/:userPage?", viewsController.getUserPage);

router.get("/search/users/:keyword", viewsController.getUserSearch);
router.get("/search/croaks/:keyword", viewsController.getCroakSearch);

router.get("/likedCroaks", viewsController.getLikedCroaks);
router.get("/:page", viewsController.getPage);
//router.get("*", viewsController.getPage);

export default router;
