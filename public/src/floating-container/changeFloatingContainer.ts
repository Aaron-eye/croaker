const overlay = document.createElement("div");
overlay.className = "overlay";

/*const floatingContainerBase = document.querySelector(
  ".floating-container-base"
);*/

export default (newFloatingContainer: any) => {
  if (!window.currentFloatingContainer) {
    document.body.appendChild(overlay);
  } else {
    // Cleaning previous floating container
    window.currentFloatingContainer.baseElement?.remove();
    window.currentFloatingContainer.element = null;
    window.currentFloatingContainer.baseElement = null;
  }
  if (!newFloatingContainer) {
    document.body.removeChild(overlay);
  }

  const newElement = document.body.appendChild(newFloatingContainer.template);
  newFloatingContainer.baseElement = newElement.parentElement;
  newFloatingContainer.element = newElement;
  window.currentFloatingContainer = newFloatingContainer;
};

/*export default (newFloatingContainer: any) => {
  if (!window.currentFloatingContainer) {
    floatingContainerBase?.classList.remove("hidden");
    document.body.appendChild(overlay);
  }
  if (!newFloatingContainer) {
    floatingContainerBase?.classList.add("hidden");
    document.body.removeChild(overlay);
  }

  window.currentFloatingContainer?.element.classList.add("hidden");
  window.currentFloatingContainer = newFloatingContainer;
  const floatingContainerElement = window.currentFloatingContainer?.element;
  floatingContainerElement?.classList.remove("hidden");
};
*/
