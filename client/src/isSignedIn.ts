export default () => {
  const signinJSON = localStorage.getItem("signin");
  if (!signinJSON) return false;
  const signinObj = JSON.parse(signinJSON);
  if (!new Date() < signinObj.signinExpirationDate) return false;

  return true;
};
