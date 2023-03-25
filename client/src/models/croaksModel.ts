export default class CroaksModel {
  croakLoaderStartingPoint = 0;

  countCroaks(loadedCroaks: Object[]) {
    this.croakLoaderStartingPoint += loadedCroaks.length;
  }

  getStartingPoint() {
    return this.croakLoaderStartingPoint;
  }
}
