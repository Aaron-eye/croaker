import axios from "axios";
import { ICroakModel, ICroakView } from "../types/croak";
import { IEngagementController } from "../types/engagement";
import EngagementController from "./engagementController";
import getUser from "../components/users/user";
import EngagementView from "../views/engagementView";
import EngagementModel from "../models/engagementModel";

import UserInfoView from "../views/userInfoView";
import UserInfoController from "./users/userInfoController";
import redirectToSignin from "../utils/users/redirectToSignin";

const userController = getUser();
const signedIn = userController.checkSignedIn();
const engagementTypes = ["like"];

interface IEngagements {
  [key: string]: IEngagementController;
}

export default class CroakController {
  handlingLike = false;

  model: ICroakModel;
  view: ICroakView;
  croakId: string;
  engagements: IEngagements = {};

  constructor(model: ICroakModel, view: ICroakView, croakId: string) {
    this.model = model;
    this.view = view;
    this.croakId = croakId;

    engagementTypes.forEach((engagementType) => {
      const engagementElement = this.view.getEngagementElement(engagementType);

      const engagementModel = new EngagementModel();
      const engagementView = new EngagementView(engagementElement);
      const engagementController = new EngagementController(
        engagementModel,
        engagementView,
        croakId,
        engagementType
      );

      this.engagements[engagementType as keyof IEngagements] =
        engagementController;
    });

    this.view.checkLike(this._handleLike.bind(this));

    const userInfoContainer = this.view.element.querySelector(".user-info");
    if (!userInfoContainer)
      throw new Error(`No user info container in the croak's element!`);

    const userInfoView = new UserInfoView(userInfoContainer);
    const userInfoController = new UserInfoController(userInfoView);
  }

  async render(loaderContainer: Element) {
    for (const engagementType of Object.keys(this.engagements)) {
      await this.engagements[engagementType as keyof IEngagements].update();
    }
    this.view.render(loaderContainer);
    return;
  }

  async _handleLike(e: Event) {
    e.stopPropagation();

    if (!signedIn) {
      redirectToSignin("You need to be signed in to like croaks!");
      return;
    }

    const like = this.engagements.like;
    if (like.model.resolving) return;
    like.model.resolving = true;

    like.engage();
    const likeOperation = like.model.engagedByCurrentUser
      ? "likeCroak"
      : "unlikeCroak";

    const likeReq = await axios({
      method: "POST",
      url: `/api/v1/croaks/${likeOperation}/${this.croakId}`,
    });
    like.model.resolving = false;

    const postResolveFunctions = like.postResolveFunctions;
    postResolveFunctions.refresh?.();
    postResolveFunctions.refresh = null;
  }
}
