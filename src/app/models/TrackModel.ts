import { observable, action, makeObservable } from 'mobx';

export interface Stats {
  count: number;
  downloads: number;
  favorites: number;
}

export class TrackModel {
  readonly id: number = null;
  public title: string = null;
  public description: string = null;
  public date: string = null;
  public artwork: string = null;
  public download: string = null;
  public downloadeable: boolean = null;
  public url: string = null;
  public duration: number = null;
  public soundcloud: string = null;
  public waveform: string = null;
  public genre: string = null;
  public stats: Stats = null;
  public license: string = null;
  public taglist: string[] = null;

  public playing: boolean = false;
  public seek: number = 0;
  public loaded: number = 0;

  constructor(track: any, podcastArtwork, readonly source: string = 'podcasts') {
    Object.keys(track).forEach(
      (key: string): void => {
        this[key] = track[key];
      }
    );
    if (!track.artwork) {
      this.artwork = podcastArtwork;
    } else {
      this.artwork = track.artwork.replace('large', 't500x500');
    }
    makeObservable(this, {
      title: observable,
      description: observable,
      date: observable,
      artwork: observable,
      download: observable,
      downloadeable: observable,
      url: observable,
      duration: observable,
      soundcloud: observable,
      waveform: observable,
      genre: observable,
      stats: observable,
      license: observable,
      taglist: observable.deep,
      playing: observable,
      seek: observable,
      loaded: observable,
      onSeek: action,
      onLoaded: action,
      play: action,
      stop: action,
      pause: action
    })
  }

  getPosition = (pct: number): number => (pct / 100) * this.duration;

  onSeek = (pct: number) => {
    this.seek = this.getPosition(pct);
  };

  onLoaded = (pct: number) => {
    this.loaded = this.getPosition(pct);
  };

  play = (): void => {
    this.playing = true;
  };

  stop = (): void => {
    this.playing = false;
    this.seek = 0;
  };

  pause = (): void => {
    this.playing = false;
  };
}

export default TrackModel;
