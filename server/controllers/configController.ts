import { RequestHandler } from "express";
import config from "./../config/global-config.json" assert { type: "json" };

export const getGlobalConfig: RequestHandler = (req, res, next) => {
  res.status(201).json({
    status: "success",
    data: config,
  });
};
