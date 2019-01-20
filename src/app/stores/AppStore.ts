import { observable, action } from 'mobx';

export class AppStore {
  @observable public loading: boolean;
  @observable public error?: Error;
  @observable public loaded: boolean;

  @observable public fetchingInfos: boolean;
  @observable public infosLoaded: boolean;

  @observable public assetBgLoaded: boolean;
  @observable public assetBg2Loaded: boolean;
  @observable public assetWaveformLoaded: boolean;

  @observable public assetBgLoading: boolean;
  @observable public assetBg2Loading: boolean;
  @observable public assetWaveformLoading: boolean;

  isFetchingInfos = (): boolean => this.fetchingInfos;

  isDataReady = (): boolean => this.infosLoaded;

  isDataLoading = (): boolean => this.fetchingInfos;

  isAssetsReady = (): boolean =>
    this.assetBgLoaded && this.assetBg2Loaded && this.assetWaveformLoaded;

  isAssetsLoading = (): boolean =>
    this.assetBgLoading && this.assetBg2Loading && this.assetWaveformLoading;

  isReady = (): boolean =>
    this.infosLoaded &&
    this.assetBg2Loaded &&
    this.assetBgLoaded &&
    this.assetWaveformLoaded &&
    !this.error;

  @action
  startFetchingData = () => {
    this.fetchingInfos = true;
  };

  @action
  startFetchingAsset = (asset) => {
    const name = `asset${asset}Loading`;
    this[name] = true;
  };

  @action
  validAsset = (asset: string) => {
    const assetName = `asset${asset}Loaded`;
    this[assetName] = true;
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
