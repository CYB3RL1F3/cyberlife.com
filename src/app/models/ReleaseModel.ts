import { observable, computed } from 'mobx';
import { Tracks } from '../../../types/releases';
import { format } from 'date-fns';

export class ReleaseModel {
  readonly id: number;
  @observable public title: string;
  @observable public artist: string;
  @observable public info: string;
  @observable public tracklist: Tracks;
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

  @computed
  get name() {
    if (this.role.toLowerCase() === 'remix') {
      return `${this.artist} - ${this.title}`;
    }
    return this.title;
  }

  @computed
  get releaseDateFormatted() {
    return format(new Date(this.releaseDate), 'DD/MM/YYYY');
  }
}

export default ReleaseModel;
