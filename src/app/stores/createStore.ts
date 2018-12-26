import { History } from 'history';
import { RouterStore } from './RouterStore';
import { STORE_ROUTER } from 'app/constants';
import EventsStore from './EventsStore';
import { FORTHCOMING_EVENTS, PAST_EVENTS } from '../constants/events';
import InfosStore from './InfosStore';
import ReleasesStore from './ReleasesStore';
import ChartStore from './ChartStore';
import AppStore from './AppStore';
import {
  STORE_FORTHCOMING_EVENTS,
  STORE_PAST_EVENTS,
  STORE_INFOS,
  STORE_RELEASES,
  STORE_CHART,
  STORE_APP
} from '../constants/stores';

export function createStores(history: History) {
  const appStore: AppStore = new AppStore();
  return {
    [STORE_APP]: appStore,
    [STORE_ROUTER]: new RouterStore(history),
    [STORE_FORTHCOMING_EVENTS]: new EventsStore(FORTHCOMING_EVENTS),
    [STORE_PAST_EVENTS]: new EventsStore(PAST_EVENTS),
    [STORE_INFOS]: new InfosStore(appStore),
    [STORE_RELEASES]: new ReleasesStore(),
    [STORE_CHART]: new ChartStore()
  };
}
