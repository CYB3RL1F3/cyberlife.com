import { format } from 'date-fns';
import { observable, computed } from 'mobx';
import { Time, Links } from '../../../types/events';
import { Location } from '../../../types/location';

export class EventModel {
  readonly id: number;
  @observable public venueId: string;
  @observable public date: string;
  @observable public country: string;
  @observable public area: string;
  @observable public title: string;
  @observable public address: string;
  @observable public flyer: string;
  @observable public lineup: string[];
  @observable public location: Location;
  @observable public time: Time;
  @observable public links: Links;
  public type: number;

  constructor(event: any, type: number) {
    this.type = type;
    Object.keys(event).forEach(
      (key: string): void => {
        this[key] = event[key];
      }
    );
  }

  @computed
  get formattedDate() {
    return format(new Date(this.date), 'DD/MM/YYYY');
  }
}

export default EventModel;
