import { observable, action } from 'mobx';

export interface Stats {
  count: number;
  downloads: number;
  favorites: number;
}

export class TrackModel {
  readonly id: number;
  @observable public title: string;
  @observable public description: string;
  @observable public date: string;
  @observable public artwork: string;
  @observable public download: string;
  @observable public downloadeable: boolean;
  @observable public url: string;
  @observable public duration: number;
  @observable public soundcloud: string;
  @observable public waveform: string;
  @observable public genre: string;
  @observable public stats: Stats;
  @observable public license: string;
  @observable public taglist: string[];

  @observable public playing: boolean = false;
  @observable public seek: number = 0;
  @observable public loaded: number = 0;
  public source: string;

  constructor(track: any, podcastArtwork, source = 'podcasts') {
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
    this.source = source;
  }

  getPosition = (pct: number): number => (pct / 100) * this.duration;

  @action
  onSeek = (pct: number) => {
    this.seek = this.getPosition(pct);
  };

  @action
  onLoaded = (pct: number) => {
    this.loaded = this.getPosition(pct);
  };

  @action
  play = (): void => {
    this.playing = true;
  };

  @action
  stop = (): void => {
    this.playing = false;
    this.seek = 0;
  };

  @action
  pause = (): void => {
    this.playing = false;
  };
}

export default TrackModel;
