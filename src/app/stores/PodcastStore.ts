import { observable, action } from 'mobx';
import { PodcastModel } from 'app/models';
import { InitializableStore } from './stores';
import { getPodcasts } from 'app/actions/actions';
import { captureException } from '@sentry/browser';

export class PodcastStore implements InitializableStore {
  @observable public loading: boolean;
  @observable public data: PodcastModel;
  @observable public error: string;

  @action
  init = () => !this.data && this.loadPodcasts();

  @action
  loadPodcasts = () => {
    this.loading = true;
    this.error = null;
    getPodcasts()
      .then(this.onPodcastLoaded)
      .catch(this.onPodcastFailed);
  };

  @action.bound
  onPodcastLoaded = (response) => {
    try {
      this.data = new PodcastModel(response.data);
      this.loading = false;
    } catch (e) {
      this.onPodcastFailed(e);
    }
  };

  @action.bound
  onPodcastFailed = (e) => {
    captureException(e);
    this.error = e;
    this.loading = false;
  };
}

export default PodcastStore;
