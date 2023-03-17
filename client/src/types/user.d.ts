export interface IUserModel extends Object {
  signin: Function;
  signout: Function;
  signup: Function;
  croak: Function;
  setData: Function;
  getData: Function;
}

export interface IUserController extends Object {
  handleSignin: Function;
  handleSignup: Function;
  handleSignout: Function;
  handleCroak: Function;
  setData: Function;
  getData: Function;
}
