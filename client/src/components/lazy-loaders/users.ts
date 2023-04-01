import { ILazyLoaderController } from "client/src/types/lazyLoader";
import UserInfoController from "client/src/controllers/users/userInfoController";
import UserInfoView from "client/src/views/userInfoView";
import lazyLoaderFactory from "./lazyLoaderFactory";
import getLazyLoadedElement from "./getLazyLoadedElement";

const searchUsersContainer = document.querySelector(".search-users");

const userHandler = function (this: null | ILazyLoaderController, user: any) {
  if (!this) return;
  const { userHtml } = user;

  const userElement = getLazyLoadedElement(userHtml);
  const userView = new UserInfoView(userElement);
  const userController = new UserInfoController(userView);

  return userController;
};

interface IUsersControllers {
  searchUsers: ILazyLoaderController | null;
}

export const usersControllers: IUsersControllers = {
  searchUsers: null,
};

export default async () => {
  if (searchUsersContainer) {
    const keyword = (searchUsersContainer as HTMLElement).dataset.keyword;
    usersControllers.searchUsers = lazyLoaderFactory(
      searchUsersContainer,
      `users/search/${keyword}`,
      userHandler
    );
  }
};
