import { signup } from "../signing/signup.js";
import { signin, signout } from "../signing/signin.js";
import FloatingContainerView from "../views/floatingContainerView.js";
import FormFloatingContainerView from "../views/formFloatingContainerView.js";
import getTemplate from "../utils/getTemplate.js";

window.currentFloatingContainer = null;

export default async () => {
  const signinContainer = await getTemplate("floating-containers/signin");

  const signinBtn = document.querySelector(".signin");
  if (signinContainer && signinBtn) {
    const signinContainerView = new FormFloatingContainerView(
      signinContainer,
      signin
    );
    signinContainerView.addOpenListener(signinBtn);
    signinContainerView.addSignFormListener();
  }

  const signupContainer = await getTemplate("floating-containers/signup");
  const signupBtn = document.querySelector(".signup");
  if (signupContainer && signupBtn) {
    const signupContainerView = new FormFloatingContainerView(
      signupContainer,
      signup
    );
    signupContainerView.addOpenListener(signupBtn);
    signupContainerView.addSignFormListener();
  }

  /*const signoutConfirmContainer = await getTemplate(
    "floating-containers/signoutConfirm"
  );
  const signoutBtn = document.querySelector(".signout");
  if (signoutConfirmContainer && signoutBtn) {
    const signoutConfirmView = new FloatingContainerView(
      signoutConfirmContainer
    );
    signoutConfirmView.addOpenListener(signoutBtn);

    const signoutYes = signoutConfirmContainer.querySelector(".yes-btn");
    const signoutNo = signoutConfirmContainer.querySelector(".no-btn");

    signoutYes?.addEventListener("click", (e) => {
      signout();
    });
    signoutNo?.addEventListener("click", (e) => {
      signoutConfirmView.close();
    });
  }*/

  //const croakContainer =
};
