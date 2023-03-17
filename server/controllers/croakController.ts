import catchAsync from "./../utils/catchAsync.js";
import Croak from "./../models/croakModel.js";

export const croak = catchAsync(async (req, res, next) => {
  const croak = await Croak.create({
    author: req.user,
    text: req.body.text,
  });

  res.status(201).json({
    status: "success",
    data: {
      data: croak,
      userNickname: req.user.nickname,
    },
  });
});
