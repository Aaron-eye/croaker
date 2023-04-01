export interface IProfileInteractionsModel {
  followedByCurrentUser: Boolean;
  resolvingFollow: Boolean;
  amountOfFollowers: number;
  changeFollowValues: Function;
}

export interface IProfileInteractionsView {
  checkFollow: Function;
  profileDetailsContainer: Element;
  updateFollow: Function;
}

export interface IProfileInteractionsController {}
