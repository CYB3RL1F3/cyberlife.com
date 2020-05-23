import { format } from 'date-fns';
import { observable, computed } from 'mobx';
import { Time, Links, Flyer } from 'types/events';
import { Location, Coordinates } from 'types/location';


export class EventModel {
  readonly id: number;
  @observable public venueId: string;
  @observable public date: string;
  @observable public country: string;
  @observable public area: string;
  @observable public title: string;
  @observable public address: string;
  @observable public flyer: Flyer;
  @observable public lineup: string[];
  @observable public location: Location;
  @observable public time: Time;
  @observable public cost?: string;
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
    return format(new Date(this.date), 'dd/MM/yyyy');
  }

  @computed
  get coordinates(): Coordinates {
    return this.location.position.map(
      (value: string): number => parseFloat(value)
    ) as Coordinates;
  }
}

export default EventModel;
