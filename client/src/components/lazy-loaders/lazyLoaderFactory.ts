import LazyLoaderModel from "../../models/lazyLoaderModel";
import LazyLoaderView from "../../views/lazyLoaderView";
import LazyLoaderController from "../../controllers/lazyLoaderController";

export default (
  lazyLoaderContainer: Element,
  sourceReference: string,
  loadedContentHandler: Function
) => {
  const lazyLoaderModel = new LazyLoaderModel();
  const lazyLoaderView = new LazyLoaderView(lazyLoaderContainer);
  const lazyLoaderController = new LazyLoaderController(
    lazyLoaderModel,
    lazyLoaderView,
    sourceReference,
    loadedContentHandler
  );

  return lazyLoaderController;
};
