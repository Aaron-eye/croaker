export interface ICroaksModel extends Object {
  croakLoaderStartingPoint: number;
  countCroaks: Function;
  getStartingPoint: Function;
}

export interface ICroaksView extends Object {
  croakLoader: Element;
  renderNoMoreCroaksMessage: Function;
  croakContainer: Element;
}
