import { observable, action } from 'mobx';
import { EventModel } from 'app/models';
import { InitializableStore } from './stores';
import RouterStore from './RouterStore';
import { PAST_EVENTS, FORTHCOMING_EVENTS } from 'app/constants/events';
import { getEventById } from 'app/actions';
import EventsStore from './EventsStore';
import { AxiosResponse } from 'axios';

export class SelectedEventStore implements InitializableStore {
  @observable public loading: boolean;
  @observable public data: EventModel;
  @observable public error: string;

  private router: RouterStore;
  private pastEventsStore: EventsStore;
  private forthcomingEventsStore: EventsStore;

  constructor(
    router: RouterStore,
    pastEventsStore: EventsStore,
    forthcomingEventsStore: EventsStore
  ) {
    this.router = router;
    this.pastEventsStore = pastEventsStore;
    this.forthcomingEventsStore = forthcomingEventsStore;
    console.log(this);
  }

  getEventFromStore = (id, type): EventModel | null => {
    let store: EventsStore = null;
    if (type === FORTHCOMING_EVENTS) {
      store = this.forthcomingEventsStore;
    } else {
      store = this.pastEventsStore;
    }
    return (
      store.data && store.data.find((event: EventModel) => event.id === id)
    );
  };

  getEventInfo = () => {
    const uri = this.router.location.pathname
      .replace('/events/', '')
      .split('/');
    if (uri.length === 1)
      return {
        type: PAST_EVENTS,
        id: parseInt(uri[0], 10)
      };
    return {
      type: parseInt(uri[0], 10),
      id: parseInt(uri[1], 10)
    };
  };

  @action
  init = () => this.getEventByIdFromRouter();

  @action
  getEventByIdFromRouter = () => {
    const { id, type } = this.getEventInfo();
    if (this.data && this.data.id === id) return;
    this.loading = true;
    this.error = null;
    const event: EventModel | null = this.getEventFromStore(id, type);
    if (event) {
      this.loading = false;
      this.data = event;
    } else {
      getEventById(id, type)
        .then(this.onEventLoaded(type))
        .catch(this.onEventFailed);
    }
  };

  @action.bound
  onEventLoaded = (type) =>
    action.bound((response: AxiosResponse) => {
      this.loading = true;
      this.error = null;
      try {
        this.data = new EventModel(response.data, type);
        this.loading = false;
      } catch (e) {
        console.log(e);
        this.onEventFailed(e);
      }
    });

  @action.bound
  onEventFailed = (e: Error) => {
    this.loading = true;
    this.error = e.message;
    this.data = null;
    this.loading = false;
  };
}

export default SelectedEventStore;
