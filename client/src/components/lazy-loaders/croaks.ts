import CroakController from "../../controllers/croakController";
import CroakModel from "../../models/croakModel";
import { ILazyLoaderController } from "../../types/lazyLoader";
import CroakView from "../../views/croakView";
import getLazyLoadedElement from "./getLazyLoadedElement";
import lazyLoaderFactory from "./lazyLoaderFactory";

const userCroaksContainer = document.querySelector(".user-croaks");
const newCroaksContainer = document.querySelector(".new-croaks");
const searchCroaksContainer = document.querySelector(".search-croaks");
const likedCroaksContainer = document.querySelector(".liked-croaks");

const croakHandler = function (this: null | ILazyLoaderController, croak: any) {
  if (!this) return;
  const { amountOfLikes, likedByCurrentUser, id: croakId, croakHtml } = croak;

  const croakElement = getLazyLoadedElement(croakHtml);
  const croakModel = new CroakModel();
  const croakView = new CroakView(croakElement);
  const croakController = new CroakController(croakModel, croakView, croakId);

  const like = croakController.engagements.like;
  like.model.engagedByCurrentUser = likedByCurrentUser;
  like.model.amountOfEngagements = amountOfLikes;
  like.update();

  return croakController;
};

interface ICroaksControllers {
  userCroaks: ILazyLoaderController | null;
  newCroaks: ILazyLoaderController | null;
  searchCroaks: ILazyLoaderController | null;
  searchUsers: ILazyLoaderController | null;
  likedCroaks: ILazyLoaderController | null;
}

export const croaksControllers: ICroaksControllers = {
  userCroaks: null,
  newCroaks: null,
  searchCroaks: null,
  searchUsers: null,
  likedCroaks: null,
};

export default () => {
  if (userCroaksContainer) {
    const userNickname = (userCroaksContainer as HTMLElement).dataset
      .userNickname;
    croaksControllers.userCroaks = lazyLoaderFactory(
      userCroaksContainer,
      `croaks/user/${userNickname}`,
      croakHandler
    );
  }

  if (newCroaksContainer) {
    croaksControllers.newCroaks = lazyLoaderFactory(
      newCroaksContainer,
      "croaks/new",
      croakHandler
    );
  }

  if (searchCroaksContainer) {
    const keyword = (searchCroaksContainer as HTMLElement).dataset.keyword;
    croaksControllers.searchCroaks = lazyLoaderFactory(
      searchCroaksContainer,
      `croaks/search/${keyword}`,
      croakHandler
    );
  }

  if (likedCroaksContainer) {
    croaksControllers.likedCroaks = lazyLoaderFactory(
      likedCroaksContainer,
      "croaks/likedCroaks",
      croakHandler
    );
  }
};
