import { format } from 'date-fns';
import { observable, computed, makeObservable } from 'mobx';
import { Time, Links, Flyer } from 'types/events';
import { Location, Coordinates } from 'types/location';


export class EventModel {
  readonly id: number = 0;
  public venueId: string = null;
  public date: string = null;
  public country: string = null;
  public area: string = null;
  public title: string = null;
  public address: string = null;
  public location: Location = null;
  public cost?: string = null;
  public lineup: string[] = [];
  public time: Time = null;
  public flyer: Flyer = null;
  public links: Links = null;
  public type: number = null;

  constructor(event: any, type: number) {
    this.type = type;
    Object.keys(event).forEach(
      (key: string): void => {
        this[key] = event[key];
      }
    );
    makeObservable(this, {
      venueId: observable,
      date: observable,
      country: observable,
      area: observable,
      title: observable,
      address: observable,
      flyer: observable,
      location: observable,
      cost: observable,
      lineup: observable,
      time: observable.deep,
      links: observable.deep,
      formattedDate: computed,
      coordinates: computed
    })
  }

  get formattedDate() {
    return format(new Date(this.date), 'dd/MM/yyyy');
  }

  get coordinates(): Coordinates {
    return this.location.position.map(
      (value: string): number => parseFloat(value)
    ) as Coordinates;
  }
}

export default EventModel;
