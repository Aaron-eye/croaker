export default (userElement: Element) => {
  const userNicknameElement = userElement.querySelector(
    ".user-nickname"
  ) as HTMLElement;
  if (!userNicknameElement)
    throw new Error("No nickname element in the user's element!");
  const userNickname =
    userNicknameElement.innerText || userNicknameElement.textContent || "";

  return userNickname;
};
