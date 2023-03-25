import { IUserController } from "../types/user";
import { IOverlayView } from "./overlays";

declare global {
  interface IGlobalConfig {
    croakMaximumLength: number;
  }

  interface Window {
    currentOverlay: IOverlayView | null;
    overlays: Object;
    textAreaAdjust: Function;
    globalConfig: IGlobalConfig;
  }
}

export {};
