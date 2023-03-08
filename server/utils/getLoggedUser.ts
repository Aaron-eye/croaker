import User from "./../models/userModel.js";
import { Request, Response, NextFunction } from "express";
import AppError from "./../utils/appError.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config({ path: "config.env" });

const JWT_SECRET: any = process.env.JWT_SECRET;

interface DecodedJwt {
  id: string;
  iat: number;
}

const getLoggedUser = async (req: Request) => {
  let token: string = "";
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token) return null;

  const decoded = jwt.verify(token, JWT_SECRET) as DecodedJwt;
  const userQuery = User.findById(decoded.id);
  if (!userQuery) return null;
  userQuery.select("-_id -__v");
  const currentUser = await userQuery;

  if (currentUser.changedPasswordAfter(decoded.iat)) return null;

  return currentUser;
};

export default async (req: Request, res: Response, next: NextFunction) => {
  req.user = await getLoggedUser(req);
  //res.locals.user = currentUser;
  next();
};

/*export default async (req: Request, res: Response, next: NextFunction) => {
  let token: string = "";
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    throw new AppError(
      "You are not logged in! Please log in to get access.",
      401
    );
  }

  // 2) Verification token
  //const decoded = await promisify(jwt.verify)(token, JWT_SECRET);
  interface DecodedJwt {
    id: string;
    iat: number;
    // Add any other properties that your JWT includes here
  }

  const decoded = jwt.verify(token, JWT_SECRET) as DecodedJwt;

  // 3) Check if user still exists
  const userQuery = await User.findById(decoded.id);
  if (!userQuery) {
    throw new AppError(
      "The user belonging to this token does no longer exist.",
      401
    );
  }

  const currentUser = userQuery.select("-_id -__v");

  // 4) Check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    throw new AppError(
      "User recently changed password! Please log in again.",
      401
    );
  }
  req.user = currentUser;
  //res.locals.user = currentUser;
};*/
