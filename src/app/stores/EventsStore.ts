import { observable, action } from 'mobx';
import { getEvents } from 'app/actions';
import { EventModel } from 'app/models';

export class EventsStore {
  public type: number;
  @observable public loading: boolean;
  @observable public error: string;
  @observable public events: EventModel[];

  constructor(type: number) {
    this.type = type;
  }

  @action
  loadEvents = () => {
    this.loading = true;
    getEvents(this.type)
      .then(this.onEventsLoaded)
      .catch(this.onEventsFailed);
  };

  @action.bound
  onEventsLoaded = (response) => {
    this.events = response.data.map((event) => new EventModel(event));
    this.loading = false;
    console.log(this.events);
  };

  @action.bound
  onEventsFailed = (e) => {
    this.error = e;
    this.loading = false;
  };

  getSelectedEvent = (index: number): EventModel => this.events[index];
}

export default EventsStore;
