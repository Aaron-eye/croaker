export interface IUserModel extends Object {
  setData: Function;
  getData: Function;
  signedIn: boolean;
  userData: any;
}

export interface IUserController extends Object {
  handleSignin: Function;
  handleSignup: Function;
  handleSignout: Function;
  handleCroak: Function;
  setData: Function;
  getData: Function;
}
