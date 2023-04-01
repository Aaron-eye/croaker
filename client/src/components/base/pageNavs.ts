import PageNavController from "client/src/controllers/pageNavController";
import { IPageNavController } from "client/src/types/pageNav";
import PageNavView from "client/src/views/pageNavView";

const pageNavs = document.querySelectorAll(".page-nav");

export const pageNavControllers: IPageNavController[] = [];

export default () => {
  [...pageNavs].forEach((pageNav) => {
    const pageNavView = new PageNavView(pageNav);
    const pageNavController = new PageNavController(pageNavView);

    pageNavControllers.push(pageNavController);
  });
};
