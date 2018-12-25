import { observable } from 'mobx';
import { Tracks } from '../../../types/charts';

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
}

export default ChartModel;
