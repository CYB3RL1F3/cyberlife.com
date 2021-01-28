import { observable, action, makeObservable } from 'mobx';
import { getInfos } from 'app/actions';
import { InfosModel } from 'app/models';
import AppStore from './AppStore';
import { captureException } from '@sentry/browser';

export class InfosStore {
  public loading: boolean = false;
  public error: string = null;
  public data: InfosModel = null;

  constructor(private readonly appStore: AppStore) {
    makeObservable(this, {
      loading: observable,
      data: observable,
      error: observable,
      loadInfos: action,
      onInfosLoaded: action.bound,
      onInfosFailed: action.bound
    });
  }

  loadInfos = () => {
    this.loading = true;
    this.error = null;
    this.appStore.startFetchingData();
    getInfos()
      .then(this.onInfosLoaded)
      .catch(this.onInfosFailed);
  };

  onInfosLoaded = (response) => {
    try {
      this.data = new InfosModel(response.data);
      this.loading = false;
      this.appStore.validateInfos();
    } catch (e) {
      this.onInfosFailed(e);
    }
  };

  onInfosFailed = (e) => {
    captureException(e);
    this.error = e;
    this.loading = false;
    this.appStore.fail(e);
  };
}

export default InfosStore;
