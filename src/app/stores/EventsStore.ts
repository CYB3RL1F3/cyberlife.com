import { observable, action } from 'mobx';
import { getEvents } from 'app/actions';
import { EventModel } from 'app/models';
import { InitializableStore } from './stores';

export class EventsStore implements InitializableStore {
  public type: number;
  @observable public loading: boolean;
  @observable public error: string;
  @observable public data: EventModel[];

  constructor(type: number) {
    this.type = type;
  }

  @action
  init = () => this.loadEvents();

  @action
  loadEvents = () => {
    this.loading = true;
    getEvents(this.type)
      .then(this.onEventsLoaded)
      .catch(this.onEventsFailed);
  };

  @action.bound
  onEventsLoaded = (response) => {
    this.data = response.data.map((event) => new EventModel(event));
    this.loading = false;
    console.log(this.data);
  };

  @action.bound
  onEventsFailed = (e) => {
    console.log(e);
    this.error = e;
    this.loading = false;
  };

  getSelectedEvent = (index: number): EventModel => this.data[index];
}

export default EventsStore;
