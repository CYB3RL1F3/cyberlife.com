import { observable, action, makeObservable } from 'mobx';
import { getReleases } from 'app/actions';
import { ReleaseModel } from 'app/models';
import { InitializableStore } from './stores';
import { captureException } from '@sentry/browser';

export class ReleasesStore implements InitializableStore {
  public loading: boolean = false;
  public data: ReleaseModel[] = null;
  public error: string = null;
  
  constructor() {
    makeObservable(this, {
      loading: observable,
      data: observable.deep,
      error: observable,
      init: action,
      loadReleases: action,
      onReleasesLoaded: action.bound,
      onReleasesFailed: action.bound
    });
  }

  init = () => !this.data && this.loadReleases();

  loadReleases = () => {
    this.loading = true;
    this.error = null;
    getReleases()
      .then(this.onReleasesLoaded)
      .catch(this.onReleasesFailed);
  };

  onReleasesLoaded = (response) => {
    try {
      this.data = response.data.map((release) => new ReleaseModel(release));
      this.loading = false;
    } catch (e) {
      this.onReleasesFailed(e);
    }
  };

  onReleasesFailed = (e) => {
    captureException(e);
    this.error = e;
    this.loading = false;
  };

  getSelectedRelease = (index: number): ReleaseModel => this.data[index];
}

export default ReleasesStore;
