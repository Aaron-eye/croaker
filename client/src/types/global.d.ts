import { IUserController } from "../types/user";
import { IOverlayView } from "./overlays";

declare global {
  interface IGlobalConfig {
    croakMaximumLength: number;
  }

  interface Window {
    currentOverlay: IOverlayView | null;
    overlays: Object;
    isSignedIn: boolean;
    userController: IUserController;
    textAreaAdjust: Function;
    globalConfig: IGlobalConfig;
  }
}

export {};
