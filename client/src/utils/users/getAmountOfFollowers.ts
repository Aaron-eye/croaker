export default (userElement: Element) => {
  const amountOfFollowersElement = userElement.querySelector(
    ".followers-amount"
  ) as HTMLElement;
  if (!amountOfFollowersElement)
    throw new Error(
      "No element with amount of followers in the user's element!"
    );
  const amountOfFollowers = Number(
    amountOfFollowersElement.innerText ||
      amountOfFollowersElement.textContent ||
      "0"
  );

  return amountOfFollowers;
};
