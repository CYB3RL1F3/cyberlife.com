import { observable, action, makeObservable } from 'mobx';
import { getEvents } from 'app/actions';
import { EventModel } from 'app/models';
import { InitializableStore } from './stores';
import { captureException } from '@sentry/browser';
export class EventsStore implements InitializableStore {
  public loading: boolean = false;
  public error: string = null;
  public data: EventModel[] = null;
  public selected: EventModel = null;

  constructor(readonly type: number) {
    makeObservable(this, {
      loading: observable,
      data: observable,
      error: observable,
      selected: observable,
      init: action,
      loadEvents: action,
      onEventsLoaded: action.bound,
      onEventsFailed: action.bound,
      selectEvent: action
    });
  }

  init = () => !this.data && this.loadEvents();

  loadEvents = () => {
    this.loading = true;
    this.error = null;
    getEvents(this.type)
      .then(this.onEventsLoaded)
      .catch(this.onEventsFailed);
  };

  reset = () => {
    this.data = null;
  };

  onEventsLoaded = (response) => {
    this.data = response.data.map((event) => new EventModel(event, this.type));
    this.loading = false;
  };

  onEventsFailed = (e) => {
    captureException(e);
    this.error = e;
    this.loading = false;
  };

  selectEvent = (id: number) => {
    this.selected = this.getEventById(id);
  };

  getEventById = (id: number): EventModel =>
    this.data.find((value: EventModel) => value.id === id);

  getSelectedEvent = (index: number): EventModel => this.data[index];
}

export default EventsStore;
