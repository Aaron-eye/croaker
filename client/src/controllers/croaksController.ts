import axios from "axios";
import loadData from "../utils/loadData";
import { ICroaksModel, ICroaksView } from "../types/croaks";
import CroakView from "../views/croakView";
import CroakController from "./croakController";
import CroakModel from "../models/croakModel";

export default class CroaksController {
  model: ICroaksModel;
  view: ICroaksView;
  bottomObserver: IntersectionObserver | null = null;
  bottomObserverOptions = {
    rootMargin: "0px",
    threshold: 0.5,
  };
  noMoreCroaks = false;

  constructor(
    model: ICroaksModel,
    view: ICroaksView,
    croakSourceReference: string
  ) {
    this.model = model;
    this.view = view;

    this.bottomObserver = new IntersectionObserver(
      this._loadCroaks.bind(
        this,
        croakSourceReference
      ) as IntersectionObserverCallback,
      this.bottomObserverOptions
    );
    this._addCroakLoader();
  }

  _addCroakLoader() {
    this.bottomObserver?.observe(this.view.croakLoader);
  }

  _removeCroakLoader() {
    this.bottomObserver?.unobserve(this.view.croakLoader);
  }

  refreshCroakLoader() {
    this._removeCroakLoader();
    this._addCroakLoader();
  }

  async _loadCroaks(croakSourceReference: string) {
    const croakLoaderStartingPoint = this.model.getStartingPoint();

    if (this.noMoreCroaks) {
      return;
    }

    const loaderStyle = {
      width: "2rem",
      height: "2rem",
      borderWidth: "0.5rem",
    };

    const croaksRes = await loadData(
      async () => {
        return axios({
          method: "GET",
          url: `/api/v1/croaks/${croakSourceReference}/startingPoint/${croakLoaderStartingPoint}`,
        });
      },
      this.view.croakLoader,
      loaderStyle
    );

    const croaks = croaksRes.data.data;
    if (croaks.length) {
      this.refreshCroakLoader();
      this.model.countCroaks(croaks);

      croaks.forEach((croak: any) => {
        const croakModel = new CroakModel();
        const croakView = new CroakView(croak.croakHtml);
        const croakController = new CroakController(
          croakModel,
          croakView,
          croak.id
        );
        croakController.render(this.view.croakContainer);
      });
    } else {
      this._removeCroakLoader();
      this.view.renderNoMoreCroaksMessage();
      this.noMoreCroaks = true;
    }
  }
}
