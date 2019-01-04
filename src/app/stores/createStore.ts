import { History } from 'history';
import { RouterStore } from './RouterStore';
import { STORE_ROUTER } from 'app/constants';
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
  STORE_FORTHCOMING_EVENTS,
  STORE_PAST_EVENTS,
  STORE_SELECTED_EVENT,
  STORE_INFOS,
  STORE_RELEASES,
  STORE_CHART,
  STORE_PODCAST,
  STORE_APP,
  STORE_PLAYER,
  STORE_SELECTED_PODCAST
} from '../constants/stores';

export function createStores(history: History) {
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
  const selectedEventStore: SelectedEventStore = new SelectedEventStore(
    routerStore,
    pastEventsStore,
    forthcomingEventsStore
  );
  return {
    [STORE_APP]: appStore,
    [STORE_ROUTER]: routerStore,
    [STORE_FORTHCOMING_EVENTS]: forthcomingEventsStore,
    [STORE_PAST_EVENTS]: pastEventsStore,
    [STORE_SELECTED_EVENT]: selectedEventStore,
    [STORE_PODCAST]: podcastStore,
    [STORE_SELECTED_PODCAST]: selectedPodcastStore,
    [STORE_INFOS]: new InfosStore(appStore),
    [STORE_RELEASES]: new ReleasesStore(),
    [STORE_CHART]: new ChartStore(),
    [STORE_PLAYER]: new PlayerStore()
  };
}
