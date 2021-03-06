import { History } from 'history';
import { RouterStore } from './RouterStore';
import EventsStore from './EventsStore';
import { FORTHCOMING_EVENTS, PAST_EVENTS } from '../constants/events';
import InfosStore from './InfosStore';
import ReleasesStore from './ReleasesStore';
import ChartStore from './ChartStore';
import PodcastStore from './PodcastStore';
import AppStore from './AppStore';
import SelectedEventStore from './SelectedEventStore';
import PlayerStore from './PlayerStore';
import SelectedPodcastStore from './SelectedPodcastStore';
import {
  Stores
} from '../constants/stores';
import SelectedReleaseStore from './SelectedReleaseStore';
import { AboutStore } from './AboutStore';

export interface IStores {
  [Stores.app]: AppStore;
  [Stores.router]: RouterStore;
  [Stores.forthcoming_events]: EventsStore;
  [Stores.past_events]: EventsStore;
  [Stores.selected_event]: SelectedEventStore;
  [Stores.podcasts]: PodcastStore;
  [Stores.selected_podcast]: SelectedPodcastStore;
  [Stores.infos]: InfosStore;
  [Stores.releases]: ReleasesStore;
  [Stores.chart]: ChartStore;
  [Stores.player]: PlayerStore;
  [Stores.selected_release]: SelectedReleaseStore;
  [Stores.about]: AboutStore;
}

export function createStores(history: History): IStores {
  const appStore: AppStore = new AppStore();
  const forthcomingEventsStore: EventsStore = new EventsStore(
    FORTHCOMING_EVENTS
  );
  const pastEventsStore: EventsStore = new EventsStore(PAST_EVENTS);
  const routerStore: RouterStore = new RouterStore(history);
  const podcastStore: PodcastStore = new PodcastStore();
  const selectedPodcastStore: SelectedPodcastStore = new SelectedPodcastStore(
    routerStore,
    podcastStore
  );
  const releasesStore = new ReleasesStore();
  const selectedReleaseStore: SelectedReleaseStore = new SelectedReleaseStore(
    routerStore,
    releasesStore
  );
  const selectedEventStore: SelectedEventStore = new SelectedEventStore(
    routerStore,
    pastEventsStore,
    forthcomingEventsStore
  );
  const infosStore = new InfosStore(appStore);
  const chartStore = new ChartStore();
  const playerStore = new PlayerStore();
  const aboutStore = new AboutStore();
  return {
    [Stores.app]: appStore,
    [Stores.router]: routerStore,
    [Stores.forthcoming_events]: forthcomingEventsStore,
    [Stores.past_events]: pastEventsStore,
    [Stores.selected_event]: selectedEventStore,
    [Stores.podcasts]: podcastStore,
    [Stores.selected_podcast]: selectedPodcastStore,
    [Stores.infos]: infosStore,
    [Stores.releases]: releasesStore,
    [Stores.chart]: chartStore,
    [Stores.player]: playerStore,
    [Stores.selected_release]: selectedReleaseStore,
    [Stores.about]: aboutStore
  };
}
