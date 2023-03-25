import catchAsync from "./../utils/catchAsync.js";
import Croak from "./../models/croakModel.js";
import User from "./../models/userModel.js";
import pug from "pug";
import croakConfig from "./../config/server-config/croak.json" assert { type: "json" };
import app from "../app.js";
import path from "path";
import moment from "moment";

export const getCroak = catchAsync(async (req, res, next) => {
  const croak = await Croak.findById(req.params.croakId);

  let likedByCurrentUser;
  if (req.user && croak.likes.includes(req.user._id)) likedByCurrentUser = true;
  else likedByCurrentUser = false;

  res.status(201).json({
    status: "success",
    likedByCurrentUser,
    data: croak,
  });
});

export const croak = catchAsync(async (req, res, next) => {
  const croak = await Croak.create({
    author: req.user._id,
    text: req.body.croakText,
  });

  req.user.croaks.push(croak._id);
  await User.findByIdAndUpdate(req.user.id, req.user);

  res.status(201).json({
    status: "success",
    data: {
      data: croak,
      userNickname: req.user.nickname,
    },
  });
});

export const getUserCroaks = catchAsync(async (req, res, next) => {
  const startingPoint = Number(req.params.startingPoint);
  const user = await User.findOne({ nickname: req.params.nickname }).populate({
    path: "croaks",
    select: "-author",
    options: {
      sort: {
        postedAt: -1,
      },
      skip: startingPoint,
      limit: croakConfig.lazyLoadedCroaks,
    },
  });

  const templateFile = path.join(app.get("views"), "croaks/croakPreview.pug");
  const compileCroak = pug.compileFile(templateFile);

  const croaks = user.croaks.map((croak: any) => {
    const formatedDate = moment(croak.postedAt).fromNow();
    const croakHtml = compileCroak({
      text: croak.text,
      likes: croak.likes,
      postedAt: formatedDate,
      author: user,
    });

    return { id: croak._id, croakHtml };
  });

  res.status(201).json({
    status: "success",
    data: croaks,
  });
});

export const likeCroak = catchAsync(async (req, res, next) => {
  if (!req.user) throw new Error("You need to be logged in to like croaks!");

  const croak = await Croak.findById(req.params.croakId);
  const userLikeIndex = croak.likes.indexOf(req.user._id);
  if (croak.likes.includes(req.user._id)) {
    croak.likes.splice(userLikeIndex);
  } else {
    croak.likes.push(req.user._id);
  }

  croak.save();

  res.status(201).json({
    status: "success",
    data: {
      amountOfLikes: croak.likes.length,
    },
  });
});
