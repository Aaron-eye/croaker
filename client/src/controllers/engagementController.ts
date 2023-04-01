import axios from "axios";
import croaksConfig from "../../config/croaks-config.json" assert { type: "json" };

import {
  IEngagementModel,
  IEngagementView,
  IEngagementController,
} from "../types/engagement";

const engagementObserverOptions = {
  threshold: 0.75,
};

export default class EngagementController implements IEngagementController {
  model: IEngagementModel;
  view: IEngagementView;
  croakId: string;
  type: string;

  constructor(
    model: IEngagementModel,
    view: IEngagementView,
    croakId: string,
    type: string
  ) {
    this.model = model;
    this.view = view;
    this.croakId = croakId;
    this.type = type;

    this.view.type = type;

    this.setRefreshTimeout();
  }

  _engagementObserverCallback = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry: IntersectionObserverEntry) => {
      if (!entry.isIntersecting) return;

      this.engagementObserver.unobserve(this.view.element);
      this.refreshEngagement();
      this.setRefreshTimeout();
    });
  };

  engagementObserver = new IntersectionObserver(
    this._engagementObserverCallback,
    engagementObserverOptions
  );

  async refreshEngagement() {
    const postResolveFunctions = this.model.postResolveFunctions;

    const userEngaged = () => {
      const resolving = this.model.resolving;
      if (resolving) {
        postResolveFunctions.refresh = this.refreshEngagement.bind(this);
      }
      return resolving;
    };

    if (userEngaged()) return;

    const croakRes = await axios({
      method: "GET",
      url: `/api/v1/croaks/getCroak/${this.croakId}`,
    });

    if (userEngaged()) return;

    if (croakRes.data.status == "success") {
      const croak = croakRes.data.croak;
      const thisEngagement = croak.engagements[`${this.type}s`];

      this.model.amountOfEngagements = thisEngagement.amount;
      this.model.engagedByCurrentUser = thisEngagement.engagedByCurrentUser;
      this.update();
    }

    return;
  }

  engage() {
    this.model.amountOfEngagements += this.model.engagedByCurrentUser ? -1 : 1;
    this.model.engagedByCurrentUser = !this.model.engagedByCurrentUser;
    this.update();
  }

  setRefreshTimeout() {
    setTimeout(() => {
      this.engagementObserver.observe(this.view.element);
    }, croaksConfig.engagementsRefreshTimeInterval);
  }

  async update() {
    await this.view.currentUserEngage(this.model.engagedByCurrentUser);
    this.view.updateNumber(this.model.amountOfEngagements);
    return;
  }

  get resolving() {
    return this.model.resolving;
  }

  get postResolveFunctions() {
    return this.model.postResolveFunctions;
  }

  set resolving(isResolving: boolean) {
    this.model.resolving = isResolving;
  }
}
