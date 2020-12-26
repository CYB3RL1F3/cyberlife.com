import { observable, action, makeObservable } from 'mobx';
import { InitializableStore } from './stores';
import RouterStore from './RouterStore';
import { getReleaseById } from 'app/actions';
import ReleaseStore from './ReleasesStore';
import { AxiosResponse } from 'axios';
import ReleaseModel from 'app/models/ReleaseModel';
import { captureException } from '@sentry/browser';

export class SelectedReleaseStore implements InitializableStore {
  public loading: boolean = false;
  public data: ReleaseModel = null;
  public error: string = null;

  constructor(private readonly router: RouterStore, private readonly releaseStore: ReleaseStore) {
    makeObservable(this, {
      loading: observable,
      data: observable.deep,
      error: observable,
      init: action,
      getReleaseByIdFromRouter: action,
      onReleaseLoaded: action.bound,
      onReleaseFailed: action.bound
    });
  }

  getReleaseFromStore = (id): ReleaseModel | null =>
    this.releaseStore.data &&
    this.releaseStore.data.find((release: ReleaseModel) => release.id === id);

  getReleaseInfo = () => {
    const uri = this.router.location.pathname
      .replace('/releases/', '')
      .split('/');
    return {
      id: parseInt(uri[0], 10)
    };
  };

  init = () => this.getReleaseByIdFromRouter();

  getReleaseByIdFromRouter = () => {
    const { id } = this.getReleaseInfo();
    if (this.data && this.data.id === id) return;
    this.loading = true;
    this.error = null;
    const release: ReleaseModel | null = this.getReleaseFromStore(id);
    if (release) {
      this.loading = false;
      this.data = release;
    } else {
      getReleaseById(id)
        .then(this.onReleaseLoaded)
        .catch(this.onReleaseFailed);
    }
  };

  onReleaseLoaded = (response: AxiosResponse) => {
    this.loading = true;
    this.error = null;
    try {
      this.data = new ReleaseModel(response.data);
      this.loading = false;
    } catch (e) {
      this.onReleaseFailed(e);
    }
  };

  onReleaseFailed = (e: Error) => {
    this.loading = true;
    this.error = e.message;
    this.data = null;
    this.loading = false;
    captureException(e);
  };
}

export default SelectedReleaseStore;
