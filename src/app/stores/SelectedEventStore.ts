import { observable, action, makeObservable } from 'mobx';
import { EventModel } from 'app/models';
import { InitializableStore } from './stores';
import RouterStore from './RouterStore';
import { PAST_EVENTS, FORTHCOMING_EVENTS } from 'app/constants/events';
import { getEventById } from 'app/actions';
import EventsStore from './EventsStore';
import { AxiosResponse } from 'axios';
import { captureException } from '@sentry/browser';

export class SelectedEventStore implements InitializableStore {
  public loading: boolean = false;
  public data: EventModel = null;
  public error: string = null;

  constructor(
    private readonly router: RouterStore,
    private readonly pastEventsStore: EventsStore,
    private readonly forthcomingEventsStore: EventsStore
  ) {
    makeObservable(this, {
      loading: observable,
      data: observable.deep,
      error: observable,
      init: action,
      getEventByIdFromRouter: action,
      onEventLoaded: action.bound,
      onEventFailed: action.bound
    });
  }

  getEventFromStore = (
    id: string,
    type: string | number
  ): EventModel | null => {
    let store: EventsStore = null;
    if (parseInt(type as string, 10) === PAST_EVENTS || type === 'past') {
      store = this.pastEventsStore;
    } else {
      store = this.forthcomingEventsStore;
    }
    return (
      store.data &&
      store.data.find(
        (event: EventModel) =>
          event.id === parseInt(id, 10) ||
          event.title.toLocaleLowerCase() ===
            decodeURIComponent(id).toLocaleLowerCase()
      )
    );
  };

  getEventInfo = () => {
    const uri = this.router.location.pathname
      .replace('/events/', '')
      .split('/');
    if (uri.length === 1)
      return {
        type: FORTHCOMING_EVENTS,
        id: uri[0]
      };
    return {
      type: uri[0],
      id: uri[1]
    };
  };

  init = () => this.getEventByIdFromRouter();

  getEventByIdFromRouter = () => {
    const { id, type } = this.getEventInfo();
    if (this.data && this.data.id === parseInt(id, 10)) return;
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

  onEventLoaded = (type) =>
    action((response: AxiosResponse) => {
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

  onEventFailed = (e: Error) => {
    captureException(e);
    this.loading = true;
    this.error = e.message;
    this.data = null;
    this.loading = false;
  };
}

export default SelectedEventStore;
