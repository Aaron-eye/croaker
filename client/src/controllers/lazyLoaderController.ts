import axios from "axios";
import loadData from "../utils/loadData";

const loaderStyle = {
  width: "2rem",
  height: "2rem",
  borderWidth: "0.5rem",
};

import {
  ILazyLoaderController,
  ILazyLoaderModel,
  ILazyLoaderView,
} from "../types/lazyLoader";

export default class LazyLoaderController implements ILazyLoaderController {
  model: ILazyLoaderModel;
  view: ILazyLoaderView;
  sourceReference: string;
  loadedItemHandler: Function;

  bottomObserver: IntersectionObserver | null = null;
  bottomObserverOptions = {
    rootMargin: "0px",
    threshold: 0.5,
  };

  constructor(
    model: ILazyLoaderModel,
    view: ILazyLoaderView,
    sourceReference: string,
    loadedItemHandler: Function
  ) {
    this.model = model;
    this.view = view;
    this.sourceReference = sourceReference;
    this.loadedItemHandler = loadedItemHandler;

    this.bottomObserver = new IntersectionObserver(
      this._load.bind(this),
      this.bottomObserverOptions
    );
    this._addLoader();
  }

  _load(entries: IntersectionObserverEntry[]) {
    entries.forEach(async (entry: IntersectionObserverEntry) => {
      if (!entry.isIntersecting) return;
      if (this.model.noMoreContent) return;

      const startingPoint = this.model.startingPoint;

      const res = await loadData(
        async () => {
          return axios({
            method: "GET",
            url: `/api/v1/${this.sourceReference}/startingPoint/${startingPoint}`,
          });
        },
        this.view.loader,
        loaderStyle
      );

      const items = res.data.data;
      if (items.length) {
        this.model.moveStartingPoint(items.length);

        for (const item of items) {
          const itemController = this.loadedItemHandler.call(this, item);
          itemController.render(this.view.lazyLoadingContainer);
        }
        this.refreshLoader();
      } else {
        this._removeLoader();
        this.view.renderBottomMessage();
        this.model.noMoreContent = true;
      }
    });
  }

  _addLoader() {
    this.bottomObserver?.observe(this.view.loader);
  }

  _removeLoader() {
    this.bottomObserver?.unobserve(this.view.loader);
  }

  refreshLoader() {
    this._removeLoader();
    this._addLoader();
  }
}
