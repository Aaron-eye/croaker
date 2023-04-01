import express from "express";
//import * as viewsController from "./../controllers/userController.js";
import * as croakController from "./../controllers/croakController.js";

const router = express.Router();

router.get("/getCroak/:croakId", croakController.getCroak);
router.post("/croak", croakController.croak);
router.get(
  "/user/:nickname/startingPoint/:startingPoint",
  croakController.getUserCroaks
);
router.get(
  "/likedCroaks/startingPoint/:startingPoint",
  croakController.getLikedCroaks
);
router.get("/new/startingPoint/:startingPoint", croakController.getNewCroaks);
router.get(
  "/search/:keyword/startingPoint/:startingPoint",
  croakController.getSearchCroaks
);

router.post("/likeCroak/:croakId", croakController.likeCroak);
router.post("/unlikeCroak/:croakId", croakController.unlikeCroak);

export default router;
