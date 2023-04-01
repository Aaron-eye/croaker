export interface IPostResolveFunctions extends Object {
  refresh: null | Function;
}

export interface IEngagementModel extends Object {
  resolving: boolean;
  postResolveFunctions: IPostResolveFunctions;
  amountOfEngagements: number;
  engagedByCurrentUser: boolean;
}

export interface IEngagementView extends Object {
  updateNumber: Function;
  currentUserEngage: Function;
  renderIcon: Function;
  element: Element;
  type: string;
}

export interface IEngagementController extends Object {
  model: IEngagementModel;
  postResolveFunctions: IPostResolveFunctions;
  update: Function;
  resolving: boolean;
  engage: Function;
}
