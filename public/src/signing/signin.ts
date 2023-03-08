import axios from "axios";
import displayInputBugs from "../utils/displayInputBugs";
import changeFloatingContainer from "../floating-container/changeFloatingContainer";
import FloatingContainerView from "../views/floatingContainerView";
import getTemplate from "../utils/getTemplate.js";

export const signin = async (data: any, form: Element) => {
  const signedIn = await getTemplate("floating-containers/signedIn");
  let signedInContainer: object | null = null;
  if (signedIn) signedInContainer = new FloatingContainerView(signedIn);

  try {
    const res = await axios({
      method: "POST",
      url: "/api/v1/users/signin",
      data,
    });

    if (res.data.status === "success") {
      changeFloatingContainer(signedInContainer);
      window.setTimeout(() => {
        location.reload();
      }, 1500);
    }
  } catch (err) {
    displayInputBugs(err, form);
  }
};

export const signout = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: "/api/v1/users/signout",
    });

    if (res.data.status == "success") {
      location.reload();
    }
  } catch (err) {
    console.log(err.response);
  }
};
