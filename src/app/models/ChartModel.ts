import { observable, computed } from 'mobx';
import { Tracks, Track, Title } from 'types/charts';

export class ChartModel {
  readonly id: number;
  @observable public date: string;
  @observable public rank: string;
  @observable public info: string;
  @observable public tracks: Tracks;

  constructor(chart: any) {
    Object.keys(chart).forEach(
      (key: string): void => {
        this[key] = chart[key];
      }
    );
  }

  @computed
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
