import catchAsync from "./../utils/catchAsync.js";
import User from "./../models/userModel.js";
import AppError from "../errors/appError.js";

const existingPages = new Set(["new"]);
const existingUserPages = new Set(["userCroaks"]);

const renderDefault = (res: any, options: any) => {
  res.status(200).render("pages/new", options);
};

const getDefaultProperties = (req: any) => {
  return {
    currentUser: req.user,
  };
};

export const getPage = catchAsync(async (req, res, next) => {
  let page = req.params.page;
  if (!existingPages.has(page)) {
    page = "new";
  }

  res.status(200).render(`pages/${page}`, {
    ...getDefaultProperties(req),
  });
});

export const getUserPage = catchAsync(async (req, res, next) => {
  const currentUser = req.user;
  const userQuery = User.aggregate([
    { $match: { nickname: req.params.nickname } },
    {
      $addFields: {
        isFollowedByCurrentUser: {
          $in: [currentUser._id, "$followers"],
        },
      },
    },
    { $limit: 1 },
  ]);
  const user = (await userQuery)[0];

  if (!user) {
    renderDefault(res, { currentUser });
    return;
  }
  const isCurrentUser = currentUser._id.equals(user._id);
  const { isFollowedByCurrentUser } = user;

  let userPage = req.params.userPage || "userCroaks";
  if (!req.params.userPage || !existingUserPages.has(req.params.userPage))
    userPage = "userCroaks";

  const template = `users/user-pages/${userPage}`;

  res.status(200).render(template, {
    ...getDefaultProperties(req),
    user,
    isCurrentUser,
    isFollowedByCurrentUser,
  });
});

const getSearch = (req: any, res: any, searchTarget: string) => {
  const keyword = req.params.keyword;

  const capitalizedTarget =
    searchTarget.charAt(0).toUpperCase() + searchTarget.slice(1);
  const searchPage = "search" + capitalizedTarget;

  res.status(200).render(`search/search-pages/${searchPage}`, {
    ...getDefaultProperties(req),
    keyword,
    searchTarget,
  });
};

export const getUserSearch = catchAsync(async (req, res, next) => {
  getSearch(req, res, "users");
});

export const getCroakSearch = catchAsync(async (req, res, next) => {
  getSearch(req, res, "croaks");
});

export const getLikedCroaks = catchAsync(async (req, res, next) => {
  res
    .status(200)
    .render("croaks/likedCroaks", { ...getDefaultProperties(req) });
});
