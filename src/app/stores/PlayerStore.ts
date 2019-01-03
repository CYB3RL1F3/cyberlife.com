import { observable, action, computed } from 'mobx';
import TrackModel from 'app/models/TrackModel';

export class PlayerStore {
  @observable public currentTrack: TrackModel;
  @observable public volume: number = 1;
  @observable public jumpTo: number = 0;

  @action
  play = (track: TrackModel) => {
    this.pause();
    track.play();
    this.jumpTo = track.seek || 0;
    this.currentTrack = track;
  };

  @action
  pause = () => {
    if (this.currentTrack && this.currentTrack.playing)
      this.currentTrack.playing = false;
    this.jumpTo = 0;
  };

  @action
  onSeek = (seek: number, jump: boolean) => {
    if (jump) {
      this.jumpTo = seek;
    } else if (this.currentTrack) this.currentTrack.seek = seek;
  };

  @action
  onLoaded = (pct: number) => {
    if (this.currentTrack && this.currentTrack.playing)
      this.currentTrack.loaded = this.currentTrack.getPosition(pct);
  };

  @action clearJump = () => {
    this.jumpTo = 0;
  };

  @computed
  get seek() {
    return this.currentTrack ? this.currentTrack.seek : 0;
  }

  @computed
  get duration() {
    return this.currentTrack ? this.currentTrack.duration : 1;
  }

  @computed
  get position() {
    return (this.seek / 100) * this.duration;
  }

  @computed
  get loaded() {
    return this.currentTrack.loaded;
  }

  @computed
  get playing() {
    return this.currentTrack.playing;
  }

  @action
  setVolume = (value: number) => {
    this.volume = value;
  };
}

export default PlayerStore;