import { IUserController } from "./users/user";
import { IOverlayView } from "./overlay";

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
