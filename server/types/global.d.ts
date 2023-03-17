import { Request } from "express";

// Augment the Request interface
declare global {
  namespace Express {
    interface Request {
      fields?: any;
      user?: any;
      // Add your custom properties here
    }
  }
}
