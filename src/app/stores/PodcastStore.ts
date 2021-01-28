import { action, makeObservable, observable } from 'mobx';
import { PodcastModel } from 'app/models';
import { InitializableStore } from './stores';
import { getPodcasts } from 'app/actions/actions';
import { captureException } from '@sentry/browser';

export class PodcastStore implements InitializableStore {

  public loading: boolean = true;
  public data: PodcastModel = null;
  public error: string = null;

  constructor() {
    makeObservable(this, {
      loading: observable,
      data: observable.deep,
      error: observable,
      init: action,
      loadPodcasts: action,
      onPodcastLoaded: action,
      onPodcastFailed: action
    });
  }

  init = () => !this.data && this.loadPodcasts();

  loadPodcasts = async () => {
    this.loading = true;
    this.error = null;
    try {
      const response = await getPodcasts();
      this.onPodcastLoaded(response);
    } catch(e) {
      this.onPodcastFailed(e);
    }
  };

  onPodcastLoaded = (response) => {
    try {
      this.data = new PodcastModel(response.data);
      this.loading = false;
    } catch (e) {
      this.onPodcastFailed(e);
    }
  };

  onPodcastFailed = (e) => {
    captureException(e);
    this.error = e;
    this.loading = false;
  };
}

export default PodcastStore;
