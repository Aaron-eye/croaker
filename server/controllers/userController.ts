import catchAsync from "./../utils/catchAsync.js";
import User from "./../models/userModel.js";
import app from "../app.js";
import AppError from "../errors/appError.js";
import path from "path";
import pug from "pug";

import filterSensiviteFields from "../utils/filterSensiviteFields.js";
import usersConfig from "./../config/server-config/users.json" assert { type: "json" };

const generateClientUsers = async (users: any) => {
  const templateFile = path.join(app.get("views"), "users/searchedUser.pug");
  const compileUser = pug.compileFile(templateFile);

  const clientUsers = [];
  for (const user of users) {
    const userHtml = compileUser({
      photo: user.photo,
      nickname: user.nickname,
    });

    clientUsers.push({
      nickname: user.nickname,
      userHtml,
    });
  }
  return clientUsers;
};

export const getMe = catchAsync(async (req, res, next) => {
  if (!req.user) return next(new AppError("Current user not logged in!", 401));
  req.params.id = req.user.id;
  next();
});

export const getUser = catchAsync(async (req, res, next) => {
  let userQuery = User.findById(req.params.id);
  const fields = req.params.fields;
  if (fields) {
    const filteredFields = filterSensiviteFields(fields, User);
    userQuery.select(filteredFields + " -_id");
  }
  const userObj = await userQuery;

  if (!userObj) {
    return next(new AppError("No user found!", 404));
  }

  res.status(200).json({
    status: "success",
    data: userObj,
  });
});

export const getSearchUsers = catchAsync(async (req, res, next) => {
  const keyword = req.params.keyword;
  const startingPoint = Number(req.params.startingPoint);
  const usersQuery = User.aggregate([
    {
      $match: {
        nickname: { $regex: keyword, $options: "i" },
      },
    },
    {
      $addFields: {
        amountOfFollowers: { $size: "$followers" },
      },
    },
    {
      $sort: { amountOfFollowers: -1 },
    },
    {
      $skip: startingPoint,
    },
    {
      $limit: usersConfig.lazyLoadedUsers,
    },
  ]);
  const users = await usersQuery;
  const clientUsers = await generateClientUsers(users);

  res.status(201).json({
    status: "success",
    data: clientUsers,
  });
});

export const followUser = catchAsync(async (req, res, next) => {
  const user = await User.updateOne(
    { nickname: req.params.nickname },
    {
      $addToSet: { followers: req.user._id },
    },
    { new: true }
  );

  res.status(201).json({
    status: "success",
  });
});

export const unfollowUser = catchAsync(async (req, res, next) => {
  const user = await User.updateOne(
    { nickname: req.params.nickname },
    {
      $pull: { followers: req.user._id },
    },
    { new: true }
  );

  res.status(201).json({
    status: "success",
  });
});
