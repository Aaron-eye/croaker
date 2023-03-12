import OverlayBase from "./OverlayBase";

export default () => {
  return (
    <OverlayBase>
      <div class="account-created overlay">
        <h1>Account successfully created!</h1>
        <p>Welcome to croaker!</p>
        <img
          class="welcome-img"
          src="/img/welcome-to-croaker.png"
          alt="frog waving to you"
        />
      </div>
    </OverlayBase>
  );
};
