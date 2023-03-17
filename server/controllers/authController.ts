import ValidationError from "../errors/validationError.js";
import jwt from "jsonwebtoken";
import { promisify } from "util";
import User from "./../models/userModel.js";
import { Request, RequestHandler, Response, NextFunction } from "express";
import catchAsync from "./../utils/catchAsync.js";
import dotenv from "dotenv";
//import Email from "./../utils/email";

dotenv.config({ path: "config.env" });

const JWT_SECRET: any = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
const JWT_COOKIE_EXPIRES_IN: any = process.env.JWT_COOKIE_EXPIRES_IN;

const signToken = (id: string) => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
};

const createSendToken = (
  user: any,
  statusCode: number,
  req: Request,
  res: Response
) => {
  const token = signToken(user._id);

  const signinExpirationDate = new Date(
    Date.now() + JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 30
  );
  res.cookie("jwt", token, {
    expires: signinExpirationDate,
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
  });

  // Remove password from output
  user.password = undefined;
  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
      signinExpirationDate,
    },
  });
};

export const signin = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const validationIssues: any = {};

  if (!email) validationIssues.email = "Please provide an email";
  if (!password) validationIssues.password = "Please provide a password";

  const user = await User.findOne({ email }).select("+password");
  if (email && !user) validationIssues.email = "This email doesn't exist";
  if (
    user &&
    password &&
    !(await user.correctPassword(password, user.password))
  ) {
    validationIssues.password = "Incorrect password";
  }

  if (Object.keys(validationIssues).length !== 0)
    return next(
      new ValidationError("Invalid credentials", 401, validationIssues)
    );
  createSendToken(user, 200, req, res);
});

export const signout = catchAsync(async (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: "success" });
});

export const signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    nickname: req.body.nickname,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  //const url = `${req.protocol}://${req.get("host")}/me`;
  //await new Email(newUser, url).sendWelcome();

  createSendToken(newUser, 201, req, res);
});
