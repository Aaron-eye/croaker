const contentContainer = document.querySelector(".content-container");
if (!contentContainer) throw new Error("No content container in this page!");
const contentLoader = contentContainer.querySelector(".content-loader");
if (!contentLoader) throw new Error("No content loader in this page!");

/*const bottomFunctions: any = [];
contentContainer.addEventListener("scroll", (event) => {
  const { scrollHeight, scrollTop, clientHeight } = event.target as HTMLElement;

  if (Math.abs(scrollHeight - clientHeight - scrollTop) < 1) {
    console.log("scrolled");
    for (const bottomFunction of bottomFunctions) {
      bottomFunction();
    }
  }
});

export default (bottomFunction: Function) => {
  bottomFunctions.push(bottomFunction);
};
*/

export default (bottomFunction: Function) => {
  let bottomObserverOptions = {
    root: contentContainer,
    rootMargin: "0px",
    threshold: 0,
  };
  let bottomObserver = new IntersectionObserver(
    bottomFunction as IntersectionObserverCallback,
    bottomObserverOptions
  );

  bottomObserver.observe(contentLoader);
};
