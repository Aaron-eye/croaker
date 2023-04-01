export default (elementString: string) => {
  const element = document.createElement("div");
  element.innerHTML = elementString.trim();
  return element;
};
