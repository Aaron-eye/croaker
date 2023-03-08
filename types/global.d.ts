import { Request } from "express";

interface ICurrentFloatingContainer extends Object {
  element: Element | null;
  baseElement: Element | null;
}

// Augment the Request interface
declare global {
  namespace Express {
    interface Request {
      user?: any;
      // Add your custom properties here
    }
  }

  interface Window {
    currentFloatingContainer: ICurrentFloatingContainer | null;
    floatingContainers: Object;
  }
}
