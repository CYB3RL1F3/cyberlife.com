import { observable, action } from 'mobx';

export class AppStore {
  @observable public loading: boolean;
  @observable public error?: Error;
  @observable public loaded: boolean;

  @observable public fetchingInfos: boolean;
  @observable public infosLoaded: boolean;

  @observable public assetBackgroundLoaded: boolean;

  @observable public assetBackgroundLoading: boolean;

  isFetchingInfos = (): boolean => this.fetchingInfos;

  isDataReady = (): boolean => this.infosLoaded;

  isDataLoading = (): boolean => this.fetchingInfos;

  isAssetsReady = (): boolean => this.assetBackgroundLoaded;

  isAssetsLoading = (): boolean => this.assetBackgroundLoading;

  isReady = (): boolean =>
    this.infosLoaded && this.assetBackgroundLoaded && !this.error;

  @action
  startFetchingData = () => {
    this.fetchingInfos = true;
  };

  @action
  startFetchingAsset = (asset) => {
    const name = `asset${asset}Loading`;
    console.log(name);
    this[name] = true;
  };

  @action
  validAsset = (asset: string) => {
    const assetName = `asset${asset}Loaded`;
    this[assetName] = true;
    console.log(this.assetBackgroundLoaded);
    this.validate();
  };

  @action
  validateInfos = () => {
    this.infosLoaded = true;
    this.validate();
  };

  @action
  validate = () => {
    if (this.isReady()) {
      this.loaded = true;
    }
  };

  @action
  fail = (e: Error) => {
    this.error = e;
  };
}

export default AppStore;
