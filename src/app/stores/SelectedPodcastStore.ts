import { observable, action } from 'mobx';
import { InitializableStore } from './stores';
import RouterStore from './RouterStore';
import { getPodcastById } from 'app/actions';
import PodcastStore from './PodcastStore';
import { AxiosResponse } from 'axios';
import TrackModel from 'app/models/TrackModel';
import { getPodcasts } from '../actions/actions';
import { PodcastModel } from 'app/models';

export class SelectedPodcastStore implements InitializableStore {
  @observable public loading: boolean;
  @observable public data: TrackModel;
  @observable public error: string;

  private router: RouterStore;
  private podcastStore: PodcastStore;

  constructor(router: RouterStore, podcastStore: PodcastStore) {
    this.router = router;
    this.podcastStore = podcastStore;
    console.log(this);
  }

  getPodcastFromStore = (id): TrackModel | null =>
    this.podcastStore.data &&
    this.podcastStore.data.tracks &&
    this.podcastStore.data.tracks.find((track: TrackModel) => track.id === id);

  getPodcastInfo = () => {
    const uri = this.router.location.pathname
      .replace('/podcasts/', '')
      .split('/');
    return {
      id: parseInt(uri[0], 10)
    };
  };

  @action
  init = () => this.getPodcastByIdFromRouter();

  @action
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
            action.bound((res: AxiosResponse) => {
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

  @action.bound
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

  @action.bound
  onPodcastFailed = (e: Error) => {
    this.loading = true;
    this.error = e.message;
    this.data = null;
    this.loading = false;
  };
}

export default SelectedPodcastStore;
