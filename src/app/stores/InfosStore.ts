import { observable, action } from 'mobx';
import { getInfos } from 'app/actions';
import { InfosModel } from 'app/models';
import AppStore from './AppStore';

export class InfosStore {
  private appStore: AppStore;
  public type: number;
  @observable public loading: boolean;
  @observable public error: string;
  @observable public data: InfosModel;

  constructor(appStore: AppStore) {
    this.appStore = appStore;
  }

  @action
  loadInfos = () => {
    this.loading = true;
    this.appStore.startFetchingData();
    getInfos()
      .then(this.onInfosLoaded)
      .catch(this.onInfosFailed);
  };

  @action.bound
  onInfosLoaded = (response) => {
    try {
      this.data = new InfosModel(response.data);
      this.loading = false;
      this.appStore.validateInfos();
      console.log(this.data);
    } catch (e) {
      this.onInfosFailed(e);
    }
  };

  @action.bound
  onInfosFailed = (e) => {
    console.log(e);
    this.error = e;
    this.loading = false;
    this.appStore.fail(e);
  };
}

export default InfosStore;
