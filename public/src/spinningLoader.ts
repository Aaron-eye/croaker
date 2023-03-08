const loader = document.createElement("div");
loader.className = "spinning-loader";

let addLoaderTimeout: any;

export const addLoader = (div: Element) => {
  addLoaderTimeout = setTimeout(() => {
    const divContents = div.childNodes;
    divContents.forEach((node) => {
      (node as HTMLElement).style.visibility = "hidden";
    });

    (div as HTMLElement).style.position = "relative";
    div?.appendChild(loader);
  }, 250);
};

export const removeLoader = (div: Element) => {
  if (addLoaderTimeout) {
    clearTimeout(addLoaderTimeout);
    addLoaderTimeout = undefined;
  }

  const divContents = div.childNodes;
  divContents.forEach((node) => {
    (node as HTMLElement).style.visibility = "visible";
  });

  (div as HTMLElement).style.position = "static";
  if (div.querySelector(":scope > .spinning-loader")) div?.removeChild(loader);
};
