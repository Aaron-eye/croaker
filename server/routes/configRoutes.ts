import express from "express";
import * as configController from "../controllers/configController.js";

const router = express.Router();

router.get("/global", configController.getGlobalConfig);

export default router;
