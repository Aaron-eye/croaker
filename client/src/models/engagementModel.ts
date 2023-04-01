import { IEngagementModel, IPostResolveFunctions } from "../types/engagement";

export default class EngagementModel implements IEngagementModel {
  amountOfEngagements = 0;
  resolving = false;
  postResolveFunctions: IPostResolveFunctions;
  engagedByCurrentUser = false;

  constructor() {
    this.postResolveFunctions = Object.create({
      refresh: null,
    });
  }
}
