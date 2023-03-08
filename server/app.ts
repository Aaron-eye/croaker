import { dirname } from "path";
import { fileURLToPath } from "url";

import express from "express";
import cookieParser from "cookie-parser";
//import morgan from "morgan";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
//import xss from "xss-clean";
import hpp from "hpp";
import crypto from "crypto";

import globalErrorHandler from "./controllers/errorController.js";
import getLoggedUser from "./utils/getLoggedUser.js";
import viewRouter from "./routes/viewRoutes.js";
import userRouter from "./routes/userRoutes.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

app.set("view engine", "pug");
app.set("views", "server/views");

// GLOBAL MIDDLEWARES
// Serving static files
//app.use(express.static(`public`));
app.use(express.static("dist/public"));
app.use(express.static("public"));

// Parsers
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());

// Set security HTTP headers
app.use(helmet());

// Development logging
/*if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}*/

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});
app.use("/api", limiter);

// Data Sanitization
//app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [],
  })
);

// Nonce
const nonce = crypto.randomBytes(16).toString("hex");
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", `script-src 'self' 'unsafe-eval'`);
  next();
});

// Routes
app.use(getLoggedUser);
app.use("/", viewRouter);
app.use("/api/v1/users", userRouter);

/*app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});*/

app.use(globalErrorHandler);

//app.use(globalErrorHandler);

export default app;
