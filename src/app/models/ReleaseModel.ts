import { observable, computed, makeObservable } from 'mobx';
import { Tracks, Artist, Track } from 'types/releases';
import { format } from 'date-fns';
import { TrackModel } from 'app/models';

export class ReleaseModel {
  readonly id: number = null;
  public title: string = null;
  public artist: string = null;
  public info: string = null;
  public tracklist: Tracks = null;
  public role: string = null;
  public year: string = null;
  public releaseDate: string = null;
  public thumb: string = null;
  public label: string = null;
  public cat: string = null;
  public discogs: string = null;
  public images: string[] = null;
  public styles: string[] = null;

  constructor(release: any) {
    makeObservable(this, {
      title: observable,
      artist: observable,
      info: observable,
      tracklist: observable,
      role: observable,
      year: observable,
      releaseDate: observable,
      thumb: observable,
      label: observable,
      cat: observable,
      discogs: observable,
      images: observable.deep,
      styles: observable.deep,
      name: computed,
      releaseDateFormatted: computed,
      cyberlifeTracks: computed
    });
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

  get name() {
    if (this.role.toLowerCase() === 'remix') {
      return `${this.artist} - ${this.title}`;
    }
    return this.title;
  }

  get releaseDateFormatted() {
    const date = new Date(this.releaseDate);
    if (isNaN(date.getFullYear())) return this.releaseDate.replace('-00', '-01').split('-').reverse().join('/');
    return format(new Date(this.releaseDate), 'dd/MM/yyyy');
  }

  matchArtist = (artist: Artist): boolean =>
    artist.name.toLocaleLowerCase().indexOf('cyberlife') > -1;

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
