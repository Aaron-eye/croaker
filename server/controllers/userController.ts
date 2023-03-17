import catchAsync from "./../utils/catchAsync.js";
import User from "./../models/userModel.js";
import AppError from "../errors/appError.js";
import filterSensiviteFields from "../utils/filterSensiviteFields.js";

export const getMe = catchAsync(async (req, res, next) => {
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
