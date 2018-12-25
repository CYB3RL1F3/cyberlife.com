import { observable } from 'mobx';
import { Tracks } from '../../../types/releases';

export class ReleaseModel {
  readonly id: number;
  @observable public title: string;
  @observable public artist: string;
  @observable public info: string;
  @observable public tracks: Tracks;
  @observable public role: string;
  @observable public year: string;
  @observable public releaseDate: string;
  @observable public thumb: string;

  constructor(release: any) {
    Object.keys(release).forEach(
      (key: string): void => {
        this[key] = release[key];
      }
    );
  }
}

export default ReleaseModel;
