export interface ICroakModel extends Object {
  likedByCurrentUser: Boolean;
  amountOfLikes: number;
}

export interface ICroakView extends Object {
  render: Function;
  checkLike: Function;
  currentUserEngage: Function;
  updateEngagement: Function;
  getEngagementElement: Function;
  engagementContainer: Element;
}
