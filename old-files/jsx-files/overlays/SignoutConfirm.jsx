import OverlayBase from "./OverlayBase";

export default () => {
  return (
    <OverlayBase>
      <div class="signout-confirm overlay">
        <p>Do you want to sign out?</p>
        <div class="choice-buttons">
          <button class="no-btn">No</button>
          <button class="yes-btn">Yes</button>
        </div>
      </div>
    </OverlayBase>
  );
};
