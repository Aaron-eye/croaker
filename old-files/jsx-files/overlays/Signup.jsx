import OverlayBase from "./OverlayBase";

export default () => {
  return (
    <OverlayBase>
      <form class="sign-form signup-form overlay">
        <h1>Sign Up</h1>
        <div class="input-div">
          <input class="sign-nickname" type="text" placeholder="Nickname" />
        </div>
        <div class="input-div">
          <input class="sign-email" type="text" placeholder="Email" />
        </div>
        <div class="input-div">
          <input class="sign-password" type="text" placeholder="Password" />
        </div>
        <div class="input-div">
          <input
            class="sign-passwordConfirm"
            type="text"
            placeholder="Confirm Password"
          />
        </div>
        <button class="sign-submit" type="submit">
          Join{" "}
        </button>
      </form>
    </OverlayBase>
  );
};
