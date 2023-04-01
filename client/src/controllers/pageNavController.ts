import { IPageNavView } from "../types/pageNav";

export default class PageNavController {
  view: IPageNavView;

  constructor(view: IPageNavView) {
    this.view = view;
  }
}
