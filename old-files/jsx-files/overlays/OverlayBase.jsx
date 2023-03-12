import CloseButton from "./../CloseButton";

export default ({ children }) => {
  return (
    <div class="overlay-base">
      <CloseButton />
      {children}
    </div>
  );
};
