import { observable, action } from 'mobx';
import { getEvents } from 'app/actions';
import { EventModel } from 'app/models';
import { InitializableStore } from './stores';
import { captureException } from '@sentry/browser';
export class EventsStore implements InitializableStore {
  public type: number;
  @observable public loading: boolean;
  @observable public error: string;
  @observable public data: EventModel[];
  @observable public selected: EventModel;

  constructor(type: number) {
    this.type = type;
  }

  @action
  init = () => !this.data && this.loadEvents();

  @action
  loadEvents = () => {
    this.loading = true;
    this.error = null;
    getEvents(this.type)
      .then(this.onEventsLoaded)
      .catch(this.onEventsFailed);
  };

  @action
  reset = () => {
    this.data = null;
  };

  @action.bound
  onEventsLoaded = (response) => {
    this.data = response.data.map((event) => new EventModel(event, this.type));
    this.loading = false;
  };

  @action.bound
  onEventsFailed = (e) => {
    captureException(e);
    this.error = e;
    this.loading = false;
  };

  @action
  selectEvent = (id: number) => {
    this.selected = this.getEventById(id);
  };

  getEventById = (id: number): EventModel =>
    this.data.find((value: EventModel) => value.id === id);

  getSelectedEvent = (index: number): EventModel => this.data[index];
}

export default EventsStore;
