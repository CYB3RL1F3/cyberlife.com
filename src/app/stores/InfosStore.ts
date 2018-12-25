import { observable, action } from 'mobx';
import { getInfos } from 'app/actions';
import { InfosModel } from 'app/models';

export class InfosStore {
  public type: number;
  @observable public loading: boolean;
  @observable public error: string;
  @observable public data: InfosModel[];

  @action
  loadInfos = () => {
    this.loading = true;
    getInfos()
      .then(this.onInfosLoaded)
      .catch(this.onInfosFailed);
  };

  @action.bound
  onInfosLoaded = (response) => {
    this.data = response.data.map((Info) => new InfosModel(Info));
    this.loading = false;
    console.log(this.data);
  };

  @action.bound
  onInfosFailed = (e) => {
    this.error = e;
    this.loading = false;
  };
}

export default InfosStore;
