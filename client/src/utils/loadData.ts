const loader = document.createElement("div");
loader.className = "spinning-loader";

let addLoaderTimeout: any;

const getChildren = (div: Element) => {
  return Array.from(div.children).map((element) => element as HTMLElement);
};

const addLoader = (div: Element) => {
  addLoaderTimeout = setTimeout(() => {
    getChildren(div).forEach(
      (element) => (element.style.visibility = "hidden")
    );

    (div as HTMLElement).style.position = "relative";
    div?.appendChild(loader);
  }, 250);
};

const removeLoader = (div: Element) => {
  if (addLoaderTimeout) {
    clearTimeout(addLoaderTimeout);
    addLoaderTimeout = undefined;
  }

  getChildren(div).forEach((element) => (element.style.visibility = "visible"));

  (div as HTMLElement).style.position = "static";
  if (div.querySelector(":scope > .spinning-loader")) div?.removeChild(loader);
};

export default async (loadingFunction: Function, div: Element) => {
  addLoader(div);

  try {
    const loadingFunctionReturn = await loadingFunction();
    removeLoader(div);
    return loadingFunctionReturn;
  } catch (err) {
    removeLoader(div);
    throw err;
  }
};
