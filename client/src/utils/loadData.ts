const getChildren = (div: Element) => {
  return Array.from(div.children).map((element) => element as HTMLElement);
};

class Loader {
  element: Element;
  loadingDiv: Element;
  addLoaderTimeout: any;
  previousDivPosition: string | null = null;

  constructor(loadingDiv: Element, styles: any = {}) {
    this.loadingDiv = loadingDiv;

    const element = document.createElement("div");
    element.className = "spinning-loader";
    Object.keys(styles).forEach((property) => {
      const propertyKey = property as keyof Object;
      element.style[propertyKey] = styles[propertyKey];
    });
    this.element = element;
  }

  render() {
    this.addLoaderTimeout = setTimeout(() => {
      getChildren(this.loadingDiv).forEach(
        (element) => (element.style.visibility = "hidden")
      );

      const previousDivPosition = window
        .getComputedStyle(this.loadingDiv)
        .getPropertyValue("position");

      this.previousDivPosition = previousDivPosition;
      (this.loadingDiv as HTMLElement).style.position = "relative";
      this.loadingDiv?.appendChild(this.element);
    }, 250);
  }

  remove() {
    if (this.addLoaderTimeout) {
      clearTimeout(this.addLoaderTimeout);
      this.addLoaderTimeout = undefined;
    }

    getChildren(this.loadingDiv).forEach(
      (element) => (element.style.visibility = "visible")
    );

    if (this.previousDivPosition) {
      (this.loadingDiv as HTMLElement).style.position =
        this.previousDivPosition;
    }
    if (this.loadingDiv.querySelector(".spinning-loader")) {
      this.loadingDiv?.removeChild(this.element);
    }
  }
}

export default async (
  loadingFunction: Function,
  div: Element,
  loaderStyles: Object = {}
) => {
  const loader = new Loader(div, loaderStyles);
  loader.render();

  try {
    const loadingFunctionReturn = await loadingFunction();
    loader.remove();
    return loadingFunctionReturn;
  } catch (err) {
    loader.remove();
    throw err;
  }
};
