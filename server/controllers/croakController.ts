import catchAsync from "./../utils/catchAsync.js";
import Croak from "./../models/croakModel.js";
import User from "./../models/userModel.js";
import pug from "pug";
import croakConfig from "./../config/server-config/croak.json" assert { type: "json" };
import app from "../app.js";
import path from "path";
import moment from "moment";
import AppError from "../errors/appError.js";

const likedBy = (user: any, croak: any) => {
  if (user && croak.likes.some((likeId: any) => likeId.equals(user.id)))
    return true;
  return false;
};

const generateClientCroaks = async (
  currentUser: any,
  croaks: any,
  preSpecifiedAuthor: any = null
) => {
  const templateFile = path.join(app.get("views"), "croaks/croakPreview.pug");
  const compileCroak = pug.compileFile(templateFile);

  const clientCroaks = [];
  for (const croak of croaks) {
    let author;
    if (preSpecifiedAuthor) author = preSpecifiedAuthor;
    else {
      const userQuery = User.findById(croak.author);
      userQuery.select("photo nickname");
      author = await userQuery;
    }

    /*const author = preSpecifiedAuthor
      ? preSpecifiedAuthor
      : await User.findById(croak.author);*/

    const likedByCurrentUser = likedBy(currentUser, croak);

    const formatedDate = moment(croak.postedAt).fromNow();
    const croakHtml = compileCroak({
      text: croak.text,
      likes: croak.likes,
      postedAt: formatedDate,
      author,
    });

    clientCroaks.push({
      id: croak._id,
      croakHtml,
      likedByCurrentUser,
      amountOfLikes: croak.likes.length,
    });
  }
  return clientCroaks;
};

export const getCroak = catchAsync(async (req, res, next) => {
  const croak = await Croak.findById(req.params.croakId);
  const likedByCurrentUser = likedBy(req.user, croak);

  res.status(201).json({
    status: "success",
    croak: {
      engagements: {
        likes: {
          amount: croak.likes.length,
          engagedByCurrentUser: likedByCurrentUser,
        },
      },
    },
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
  const userQuery = User.findOne({
    nickname: req.params.nickname,
  }).populate({
    path: "croaks",
    select: "-author",
    options: {
      skip: startingPoint,
      limit: croakConfig.lazyLoadedCroaks,
      sort: {
        postedAt: -1,
      },
    },
  });
  const user = await userQuery;

  const clientCroaks = await generateClientCroaks(req.user, user.croaks, user);

  res.status(201).json({
    status: "success",
    data: clientCroaks,
  });
});

export const getLikedCroaks = catchAsync(async (req, res, next) => {
  const startingPoint = Number(req.params.startingPoint);
  const userQuery = User.findById(req.user._id).populate({
    path: "likedCroaks",
    options: {
      skip: startingPoint,
      limit: croakConfig.lazyLoadedCroaks,
      sort: {
        postedAt: -1,
      },
    },
  });
  userQuery.select("likedCroaks");
  const user = await userQuery;

  const clientCroaks = await generateClientCroaks(req.user, user.likedCroaks);

  res.status(201).json({
    status: "success",
    data: clientCroaks,
  });
});

export const getNewCroaks = catchAsync(async (req, res, next) => {
  const startingPoint = Number(req.params.startingPoint);
  const croaksQuery = Croak.aggregate([
    {
      $sort: { postedAt: -1 },
    },
    {
      $skip: startingPoint,
    },
    {
      $limit: croakConfig.lazyLoadedCroaks,
    },
  ]);
  const croaks = await croaksQuery;

  const clientCroaks = await generateClientCroaks(req.user, croaks);

  res.status(201).json({
    status: "success",
    data: clientCroaks,
  });
});

export const getSearchCroaks = catchAsync(async (req, res, next) => {
  const keyword = req.params.keyword;
  const startingPoint = Number(req.params.startingPoint);
  const croaksQuery = Croak.aggregate([
    {
      $match: {
        text: { $regex: keyword, $options: "i" },
      },
    },
    {
      $sort: { postedAt: -1 },
    },
    {
      $skip: startingPoint,
    },
    {
      $limit: croakConfig.lazyLoadedCroaks,
    },
  ]);
  const croaks = await croaksQuery;
  const clientCroaks = await generateClientCroaks(req.user, croaks);

  res.status(201).json({
    status: "success",
    data: clientCroaks,
  });
});

export const likeCroak = catchAsync(async (req, res, next) => {
  if (!req.user)
    return next(new AppError("You need to be logged in to like croaks!", 401));

  const croak = await Croak.findByIdAndUpdate(
    req.params.croakId,
    {
      $addToSet: { likes: req.user._id },
    },
    { new: true }
  );
  await User.findByIdAndUpdate(req.user._id, {
    $addToSet: { likedCroaks: croak._id },
  });

  res.status(201).json({
    status: "success",
    data: {
      amountOfLikes: croak.likes.length,
    },
  });
});

export const unlikeCroak = catchAsync(async (req, res, next) => {
  if (!req.user)
    return next(
      new AppError("You need to be logged in to unlike croaks!", 401)
    );

  const croak = await Croak.findByIdAndUpdate(req.params.croakId, {
    $pull: { likes: req.user._id },
  });
  await User.findByIdAndUpdate(req.user._id, {
    $pull: { likedCroaks: croak._id },
  });

  res.status(201).json({
    status: "success",
    data: {
      amountOfLikes: croak.likes.length,
    },
  });
});
