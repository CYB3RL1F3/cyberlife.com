import { observable, computed } from 'mobx';
import { Tracks, Artist } from 'types/releases';
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
  @observable public label: string;
  @observable public images: string[];

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

  matchArtist = (artist: Artist): boolean =>
    artist.name.toLocaleLowerCase().indexOf('cyberlife') > -1;

  @computed
  get cyberlifeTracks(): Tracks {
    return this.tracklist.filter((track) => {
      if (track.artists && track.artists.findIndex(this.matchArtist) > -1)
        return true;
      if (
        track.extraartists &&
        track.extraartists.findIndex(this.matchArtist) > -1
      )
        return true;
      return false;
    });
  }
}

export default ReleaseModel;
