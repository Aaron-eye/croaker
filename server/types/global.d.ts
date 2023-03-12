import { Request } from "express";

// Augment the Request interface
declare global {
  namespace Express {
    interface Request {
      user?: any;
      // Add your custom properties here
    }
  }
}
