export interface ICroakModel extends Object {}

export interface ICroakView extends Object {
  render: Function;
  element: Element;
  checkLike: Function;
  getEngagementElement: Function;
  engagementContainer: Element;
}
