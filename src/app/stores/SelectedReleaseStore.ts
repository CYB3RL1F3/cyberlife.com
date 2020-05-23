import { observable, action } from 'mobx';
import { InitializableStore } from './stores';
import RouterStore from './RouterStore';
import { getReleaseById } from 'app/actions';
import ReleaseStore from './ReleasesStore';
import { AxiosResponse } from 'axios';
import ReleaseModel from 'app/models/ReleaseModel';
import { captureException } from '@sentry/browser';

export class SelectedReleaseStore implements InitializableStore {
  @observable public loading: boolean;
  @observable public data: ReleaseModel;
  @observable public error: string;

  private router: RouterStore;
  private releaseStore: ReleaseStore;

  constructor(router: RouterStore, releaseStore: ReleaseStore) {
    this.router = router;
    this.releaseStore = releaseStore;
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

  @action
  init = () => this.getReleaseByIdFromRouter();

  @action
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

  @action.bound
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

  @action.bound
  onReleaseFailed = (e: Error) => {
    this.loading = true;
    this.error = e.message;
    this.data = null;
    this.loading = false;
    captureException(e);
  };
}

export default SelectedReleaseStore;
