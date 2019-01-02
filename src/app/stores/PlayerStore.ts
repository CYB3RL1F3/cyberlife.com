import { observable, action, computed } from 'mobx';
import TrackModel from 'app/models/TrackModel';

export class PlayerStore {
  @observable public currentTrack: TrackModel;
  @observable public volume: number;

  @action
  play = (track: TrackModel) => {
    this.pause();
    track.play();
    this.currentTrack = track;
  };

  @action
  pause = () => {
    if (this.currentTrack && this.currentTrack.playing)
      this.currentTrack.playing = false;
  };

  @action
  onSeek = (pct: number) => {
    this.currentTrack.onSeek(pct);
  };

  @action
  onLoaded = (pct: number) => {
    this.currentTrack.onLoaded(pct);
  };

  @computed
  get seek() {
    return this.currentTrack.seek;
  }

  @computed
  get loaded() {
    return this.currentTrack.loaded;
  }

  @computed
  get playing() {
    return this.currentTrack.playing;
  }
}

export default PlayerStore;
