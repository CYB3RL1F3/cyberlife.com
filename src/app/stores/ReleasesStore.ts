import { observable, action } from 'mobx';
import { getReleases } from 'app/actions';
import { ReleaseModel } from 'app/models';
import { InitializableStore } from './stores';
import { captureException } from '@sentry/browser';

export class ReleasesStore implements InitializableStore {
  @observable public loading: boolean;
  @observable public data: ReleaseModel[];
  @observable public error: string;

  @action
  init = () => !this.data && this.loadReleases();

  @action
  loadReleases = () => {
    this.loading = true;
    this.error = null;
    getReleases()
      .then(this.onReleasesLoaded)
      .catch(this.onReleasesFailed);
  };

  @action.bound
  onReleasesLoaded = (response) => {
    try {
      this.data = response.data.map((release) => new ReleaseModel(release));
      this.loading = false;
    } catch (e) {
      this.onReleasesFailed(e);
    }
  };

  @action.bound
  onReleasesFailed = (e) => {
    captureException(e);
    this.error = e;
    this.loading = false;
  };

  getSelectedRelease = (index: number): ReleaseModel => this.data[index];
}

export default ReleasesStore;
