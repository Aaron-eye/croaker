import { ILazyLoaderView } from "../types/lazyLoader";

export default class LazyLoaderView implements ILazyLoaderView {
  lazyLoadingContainer: Element;
  loader: Element;
  bottomMessage = `You've reached the bottom of the page!`;

  constructor(baseContainer: Element) {
    const loader = baseContainer.querySelector(".content-loader");
    if (!loader) throw new Error("No loader found!");
    const lazyLoadingContainer = baseContainer.querySelector(
      ".lazy-loading-container"
    );
    if (!lazyLoadingContainer)
      throw new Error("No lazy loading container found!");

    this.lazyLoadingContainer = lazyLoadingContainer;
    this.loader = loader;
  }

  /*renderCroaks(posts: string[]) {
      this.croakContainer.insertAdjacentHTML("beforeend", posts.join(""));
    }*/

  renderBottomMessage() {
    const loaderText = this.loader.querySelector(".content-loader-text");
    if (!loaderText) throw new Error("No loader text element found!");
    (loaderText as HTMLElement).innerText = this.bottomMessage;
  }
}
