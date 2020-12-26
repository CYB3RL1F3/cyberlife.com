import { observable, computed, makeObservable } from 'mobx';
import { Tracks, Track, Title } from 'types/charts';

export class ChartModel {
  readonly id: number = 0;
  public date: string = null;
  public rank: string = null;
  public info: string = null;
  public tracks: Tracks = [];

  constructor(chart: any) {
    makeObservable(this, {
      date: observable,
      rank: observable,
      info: observable,
      tracks: observable,
      titles: computed
    })
    Object.keys(chart).forEach(
      (key: string): void => {
        this[key] = chart[key];
      }
    );
  }

  get titles() {
    return this.tracks.map(
      (track: Track): Title => ({
        title: `${track.artist} - ${track.title} ${
          track.remix ? `(${track.remix})` : ''
        }`,
        label: track.label,
        link: track.RA_link
      })
    );
  }
}

export default ChartModel;
