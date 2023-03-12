import OverlayBase from "./OverlayBase";

export default () => {
  return (
    <OverlayBase>
      <div class="signed-in overlay">
        <h1>Logged In</h1>
        <p>Welcome back!</p>
        <img
          class="welcome-img"
          src="/img/welcome-to-croaker.png"
          alt="Frog waving to you"
        />
      </div>
    </OverlayBase>
  );
};
