export interface IUserModel extends Object {
  signin: Function;
  signout: Function;
  signup: Function;
}

export interface IUserController extends Object {
  handleSignout: Function;
}
