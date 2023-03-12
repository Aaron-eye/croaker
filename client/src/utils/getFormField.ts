export default (input: Element) => {
  return input.className.split(" ")[0].replace("sign-", "");
};
