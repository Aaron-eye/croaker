import { ILazyLoaderModel } from "../types/lazyLoader";

export default class LazyLoaderModel implements ILazyLoaderModel {
  noMoreContent = false;
  startingPoint = 0;

  moveStartingPoint(sum: number) {
    this.startingPoint += sum;
  }
}
