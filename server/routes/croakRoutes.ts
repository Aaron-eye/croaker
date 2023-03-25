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
router.post("/likeCroak/:croakId", croakController.likeCroak);

export default router;
