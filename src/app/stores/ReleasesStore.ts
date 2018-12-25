import { observable, action } from 'mobx';
import { getReleases } from 'app/actions';
import { ReleaseModel } from 'app/models';

export class ReleasesStore {
  @observable public loading: boolean;
  @observable public data: ReleaseModel[];
  @observable public error: string;

  @action
  loadReleases = () => {
    this.loading = true;
    getReleases()
      .then(this.onInfosLoaded)
      .catch(this.onInfosFailed);
  };

  @action.bound
  onInfosLoaded = (response) => {
    this.data = response.data.map((release) => new ReleaseModel(release));
    this.loading = false;
    console.log(this.data);
  };

  @action.bound
  onInfosFailed = (e) => {
    this.error = e;
    this.loading = false;
  };

  getSelectedRelease = (index: number): ReleaseModel => this.data[index];
}

export default ReleasesStore;
