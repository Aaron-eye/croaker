// @ts-nocheck
import AppError from "../errors/appError.js";
import ValidationError from "../errors/validationError.js";
import { ErrorRequestHandler, Request, Response } from "express";
import mongoose from "mongoose";

const handleCastErrorDB = (err: any) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err: any) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];

  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err: any) => {
  const errors = Object.values(err.errors);
  const errorsMessages = errors.map((el: any) => el.message);

  //const message = `Invalid input data. ${errorsMessages.join(". ")}`;
  const message = `Invalid input data.`;
  const validationIssues: any = {};
  errors.forEach((err: any) => {
    validationIssues[err.path] = err.message;
  });

  // return new AppError(message, 400, validationIssues);
  return new ValidationError(message, 400, validationIssues);
};

const handleJWTError = () =>
  new AppError("Invalid token. Please log in again!", 401);

const handleJWTExpiredError = () =>
  new AppError("Your token has expired! Please log in again.", 401);

const sendErrorDev = (err: any, req: Request, res: Response) => {
  // A) API
  if (req.originalUrl.startsWith("/api")) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }

  // B) RENDERED WEBSITE
  console.error("ERROR 💥", err);
  return res.status(err.statusCode).render("error", {
    title: "Something went wrong!",
    msg: err.message,
  });
};

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  let error = { ...err };
  error.message = err.message;

  if (err instanceof mongoose.Error.ValidationError) {
    error = handleValidationErrorDB(error);
  }
  if (error.name === "CastError") error = handleCastErrorDB(error);
  if (error.code === 11000) error = handleDuplicateFieldsDB(error);
  if (error.name === "JsonWebTokenError") error = handleJWTError();
  if (error.name === "TokenExpiredError") error = handleJWTExpiredError();

  const defaultErrorRes = {
    status: error.status,
    message: error.message,
  };
  return res
    .status(error.statusCode)
    .json({ ...defaultErrorRes, ...error.specifications });
};

export default globalErrorHandler;
