import { observable, action, makeObservable } from 'mobx';

export class AppStore {
  loading: boolean = false;
  error?: Error = null;
  loaded: boolean = false;

  fetchingInfos: boolean = false;
  infosLoaded: boolean = false;

  assetBackgroundLoaded: boolean = false;

  assetBackgroundLoading: boolean = false;

  isFetchingInfos = (): boolean => this.fetchingInfos;

  isDataReady = (): boolean => this.infosLoaded;

  isDataLoading = (): boolean => this.fetchingInfos;

  isAssetsReady = (): boolean => this.assetBackgroundLoaded;

  isAssetsLoading = (): boolean => this.assetBackgroundLoading;

  isReady = (): boolean => this.infosLoaded && !this.error;

  startFetchingData = () => {
    this.fetchingInfos = true;
  };

  startFetchingAsset = (asset) => {
    const name = `asset${asset}Loading`;
    this[name] = true;
  };

  validAsset = (asset: string) => {
    const assetName = `asset${asset}Loaded`;
    this[assetName] = true;
    this.validate();
  };

  validateInfos = () => {
    this.infosLoaded = true;
    this.validate();
  };

  validate = () => {
    if (this.isReady()) {
      this.loaded = true;
    }
  };

  fail = (e: Error) => {
    this.error = e;
  };

  constructor() {
    makeObservable(this, {
      loading: observable,
      loaded: observable,
      error: observable,
      fetchingInfos: observable,
      infosLoaded: observable,
      assetBackgroundLoaded: observable,
      assetBackgroundLoading: observable,
      startFetchingAsset: action,
      startFetchingData: action,
      validAsset: action,
      validate: action,
      validateInfos: action,
      fail: action,
    });
  }
}

export default AppStore;
