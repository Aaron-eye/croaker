import { IOverlayView } from "./overlays";

declare global {
  interface Window {
    currentOverlay: IOverlayView | null;
    overlays: Object;
    isSignedIn: boolean;
  }
}

export {};
