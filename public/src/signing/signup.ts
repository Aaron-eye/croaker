import axios from "axios";
import displayInputBugs from "./../utils/displayInputBugs.js";
import changeFloatingContainer from "../floating-container/changeFloatingContainer.js";
import FloatingContainerView from "./../views/floatingContainerView";
import getTemplate from "../utils/getTemplate.js";

export const signup = async (data: any, form: Element) => {
  const accountCreated = await getTemplate(
    "floating-containers/accountCreated"
  );
  let accountCreatedContainer: object | null = null;
  if (accountCreated)
    accountCreatedContainer = new FloatingContainerView(accountCreated);

  try {
    const res = await axios({
      method: "POST",
      url: "/api/v1/users/signup",
      data,
    });

    if (res.data.status === "success") {
      changeFloatingContainer(accountCreatedContainer);
      window.setTimeout(() => {
        location.reload();
      }, 1500);
    }
  } catch (err) {
    displayInputBugs(err, form);
  }
  return;
};
