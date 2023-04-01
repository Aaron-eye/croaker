export interface ILazyLoaderModel extends Object {
  noMoreContent: Boolean;
  startingPoint: number;
  moveStartingPoint: Function;
}

export interface ILazyLoaderView extends Object {
  renderBottomMessage: Function;
  loader: Element;
  lazyLoadingContainer: Element;
}

export interface ILazyLoaderController extends Object {
  refreshLoader: Function;
  view: ILazyLoaderView;
}
