import { observable, computed } from 'mobx';
import { Tracks, Artist, Track } from 'types/releases';
import { format } from 'date-fns';
import { TrackModel } from 'app/models';

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
  @observable public cat: string;
  @observable public discogs: string;
  @observable public images: string[];
  @observable public styles: string[];

  constructor(release: any) {
    Object.keys(release).forEach(
      (key: string): void => {
        if (key === 'tracklist') {
          this.tracklist = release.tracklist.map((track: Track) => {
            if (track.stream) {
              track.stream = new TrackModel(
                track.stream,
                '',
                `release_${release.id}`
              );
            } else {
              track.stream = null;
            }
            return track;
          });
        } else {
          this[key] = release[key];
        }
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
    const date = new Date(this.releaseDate);
    if (isNaN(date.getFullYear())) return this.releaseDate.replace(/\-/g, '/');
    return format(new Date(this.releaseDate), 'dd/mm/yyyy');
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
