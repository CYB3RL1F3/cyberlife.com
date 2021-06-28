import { observable, action, makeObservable } from 'mobx';
import { InitializableStore } from './stores';
import RouterStore from './RouterStore';
import { getPodcastById } from 'app/actions';
import PodcastStore from './PodcastStore';
import { AxiosResponse } from 'axios';
import TrackModel from 'app/models/TrackModel';
import { getPodcasts } from '../actions/actions';
import { PodcastModel } from 'app/models';
import { captureException } from '@sentry/browser';

export class SelectedPodcastStore implements InitializableStore {
  public loading: boolean = false;
  public data: TrackModel = null;
  public error: string = null;

  constructor(
    private readonly router: RouterStore,
    private readonly podcastStore: PodcastStore
  ) {
    makeObservable(this, {
      loading: observable,
      data: observable.deep,
      error: observable,
      init: action,
      getPodcastByIdFromRouter: action,
      onPodcastLoaded: action.bound,
      onPodcastFailed: action.bound,
    });
  }

  getPodcastFromStore = (id): TrackModel | null =>
    this.podcastStore?.data?.tracks?.find(
      (track: TrackModel) => track.id === id
    );

  getPodcastInfo = () => {
    const uri = this.router.location.pathname
      .replace('/podcasts/', '')
      .split('/');
    return {
      id: parseInt(uri[0], 10),
    };
  };

  init = () => this.getPodcastByIdFromRouter();

  getPodcastByIdFromRouter = () => {
    const { id } = this.getPodcastInfo();
    if (this.data && this.data.id === id) return;
    this.loading = true;
    this.error = null;
    const podcast: TrackModel | null = this.getPodcastFromStore(id);
    if (podcast) {
      this.loading = false;
      this.data = podcast;
    } else {
      const artwork = this.podcastStore.data && this.podcastStore.data.artwork;
      if (!artwork) {
        getPodcasts()
          .then(
            action((res: AxiosResponse) => {
              this.podcastStore.data = new PodcastModel(res.data);
              this.data = this.getPodcastFromStore(id);
              this.loading = false;
            })
          )
          .catch(this.onPodcastFailed);
      } else {
        getPodcastById(id)
          .then(this.onPodcastLoaded)
          .catch(this.onPodcastFailed);
      }
    }
  };

  onPodcastLoaded = (response: AxiosResponse) => {
    this.loading = true;
    this.error = null;
    try {
      let artwork = this.podcastStore.data && this.podcastStore.data.artwork;
      this.data = new TrackModel(response.data, artwork);
      this.loading = false;
    } catch (e) {
      console.log(e);
      this.onPodcastFailed(e);
    }
  };

  onPodcastFailed = (e: Error) => {
    captureException(e);
    this.loading = true;
    this.error = e.message;
    this.data = null;
    this.loading = false;
  };
}

export default SelectedPodcastStore;
