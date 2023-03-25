import axios from "axios";
import { ICroakModel, ICroakView } from "../types/croak";
import croaksConfig from "../../config/croaks-config.json" assert { type: "json" };
import getUser from "../utils/getUser";

const userController = getUser();

export default class CroakController {
  handlingLike = false;
  model: ICroakModel;
  view: ICroakView;
  croakId: string;

  constructor(model: ICroakModel, view: ICroakView, croakId: string) {
    this.model = model;
    this.view = view;
    this.croakId = croakId;

    if (userController.checkSignedIn())
      this.view.checkLike(this._handleLike.bind(this));

    this.setRefreshEngagementsTimeout();
  }

  render(croakContainer: Element) {
    this.view.render(croakContainer);
  }

  setRefreshEngagementsTimeout() {
    this._refreshAllEngagements();
    setTimeout(() => {
      const engagementsObserverOptions = {
        rootMargin: "0px",
        threshold: 0.75,
      };
      const engagementsObserver = new IntersectionObserver(() => {
        this._refreshAllEngagements();
        this.setRefreshEngagementsTimeout();
      }, engagementsObserverOptions);

      engagementsObserver.observe(this.view.engagementContainer);
    }, croaksConfig.engagementsRefreshTimeInterval);
  }

  async _refreshAllEngagements() {
    console.log("refreshed");
    this.refreshEngagement("like");
  }

  async refreshEngagement(engagementType: string) {
    const croakRes = await axios({
      method: "GET",
      url: `/api/v1/croaks/getCroak/${this.croakId}`,
    });

    if (croakRes.data.status == "success") {
      const croak = croakRes.data.data;
      const amountOfLikes = croak[`${engagementType}s`].length;

      this.model.amountOfLikes = amountOfLikes;
      this.view.updateEngagement(engagementType, amountOfLikes);

      const { likedByCurrentUser } = croakRes.data;
      if (likedByCurrentUser) {
        this.model.likedByCurrentUser = true;
        this.view.currentUserEngage(engagementType, true);
      }
    }

    return;
  }

  async _handleLike() {
    if (this.handlingLike) return;
    this.handlingLike = true;

    const likedByCurrentUser = this.model.likedByCurrentUser;
    const likeSum = likedByCurrentUser ? -1 : 1;

    this.view.updateEngagement("like", this.model.amountOfLikes + likeSum);
    this.model.amountOfLikes += likeSum;
    this.view.currentUserEngage("like");
    this.model.likedByCurrentUser = !likedByCurrentUser;

    const likeRes = await axios({
      method: "POST",
      url: `/api/v1/croaks/likeCroak/${this.croakId}`,
    });

    this.handlingLike = false;
  }
}
