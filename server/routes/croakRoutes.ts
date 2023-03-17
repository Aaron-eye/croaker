import express from "express";
//import * as viewsController from "./../controllers/userController.js";
import * as croakController from "./../controllers/croakController.js";

const router = express.Router();

router.post("/croak", croakController.croak);

export default router;
