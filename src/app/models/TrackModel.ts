import { observable, action } from 'mobx';
import { Track } from '../../../types/playlists';

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
  @observable public tracks: Track[];

  @observable public playing: boolean = false;
  @observable public seek: number = 0;
  @observable public loaded: number = 0;

  constructor(track: any, podcastArtwork) {
    Object.keys(track).forEach(
      (key: string): void => {
        this[key] = track[key];
      }
    );
    if (!track.artwork) {
      this.artwork = podcastArtwork;
    }
  }

  getPosition = (pct: number): number => (pct / 100) * this.duration;

  @action.bound
  onSeek = (pct: number) => {
    this.seek = this.getPosition(pct);
  };

  @action.bound
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
