import { History } from 'history';
import { RouterStore } from './RouterStore';
import { STORE_ROUTER } from 'app/constants';
import EventsStore from './EventsStore';
import { FORTHCOMING_EVENTS, PAST_EVENTS } from '../constants/events';
import InfosStore from './InfosStore';
import ReleasesStore from './ReleasesStore';
import ChartStore from './ChartStore';
import {
  STORE_FORTHCOMING_EVENTS,
  STORE_PAST_EVENTS,
  STORE_INFOS,
  STORE_RELEASES,
  STORE_CHART
} from '../constants/stores';

export function createStores(history: History) {
  return {
    [STORE_ROUTER]: new RouterStore(history),
    [STORE_FORTHCOMING_EVENTS]: new EventsStore(FORTHCOMING_EVENTS),
    [STORE_PAST_EVENTS]: new EventsStore(PAST_EVENTS),
    [STORE_INFOS]: new InfosStore(),
    [STORE_RELEASES]: new ReleasesStore(),
    [STORE_CHART]: new ChartStore()
  };
}
