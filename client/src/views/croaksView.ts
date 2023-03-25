export default class CroaksView {
  croakBaseContainer: Element;
  croakContainer: Element;
  croakLoader: Element;

  constructor(croakBaseContainer: Element) {
    const croakLoader = croakBaseContainer.querySelector(".croak-loader");
    if (!croakLoader) throw new Error("No croak loader found!");
    const croakContainer = croakBaseContainer.querySelector(".croaks");
    if (!croakContainer) throw new Error("No croak container found!");

    this.croakBaseContainer = croakBaseContainer;
    this.croakContainer = croakContainer;
    this.croakLoader = croakLoader;
  }

  /*renderCroaks(posts: string[]) {
    this.croakContainer.insertAdjacentHTML("beforeend", posts.join(""));
  }*/

  renderNoMoreCroaksMessage() {
    const croakLoaderText =
      this.croakLoader.querySelector(".croak-loader-text");
    if (!croakLoaderText) throw new Error("No croak loader text element!");
    (
      croakLoaderText as HTMLElement
    ).innerText = `You've reached the bottom of the page!`;
  }
}
