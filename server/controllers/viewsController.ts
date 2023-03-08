import { RequestHandler } from "express";
import crypto from "crypto";
import getLoggedUser from "./../utils/getLoggedUser.js";
import catchAsync from "./../utils/catchAsync.js";
import User from "./../models/userModel.js";
import AppError from "./../utils/appError.js";

const existingPages = new Set(["feed"]);
const existingUserPages = new Set(["userCroaks"]);

export const getPage = catchAsync(async (req, res, next) => {
  const currentUser = req.user;

  if (req.params.page === "favicon.ico") {
    return next();
  }

  const page = req.params.page;
  if (!existingPages.has(page))
    return next(new AppError("Page not found", 404));

  res.status(200).render(page, { currentUser });
});

export const getUserPage = catchAsync(async (req, res, next) => {
  const currentUser = req.user;

  const userQuery = User.findOne({ nickname: req.params.nickname });
  userQuery.select("-_id -__v");
  const user = await userQuery;

  const page = req.params.userPage || "userCroaks";
  if (!existingUserPages.has(page))
    return next(new AppError("User page not found", 404));

  res.status(200).render(page, { user, currentUser });
});
