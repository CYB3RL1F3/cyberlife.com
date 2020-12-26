import { observable, action, computed, makeObservable } from 'mobx';
import TrackModel from 'app/models/TrackModel';

export class PlayerStore {
  constructor() {
    makeObservable(this, {
      currentTrack: observable,
      volume: observable,
      seekPosition: observable,
      play: action,
      pause: action,
      onSeek: action,
      onLoaded: action,
      clearSeek: action,
      setVolume: action,
      seek: computed,
      duration: computed,
      position: computed,
      loaded: computed,
      playing: computed
    });
  }
  public currentTrack: TrackModel = null;
  public volume: number = 1;
  public seekPosition: number = 0;

  play = (track: TrackModel) => {
    this.pause();
    if (track) {
      track.play();
      this.seekPosition = track.seek || 0;
      this.currentTrack = track;
    }
  };

  pause = () => {
    if (this.currentTrack && this.currentTrack.playing)
      this.currentTrack.playing = false;
    this.seekPosition = 0;
  };

  onSeek = (seek: number, toMoveSeekPosition: boolean) => {
    if (toMoveSeekPosition) {
      this.seekPosition = seek;
    } else if (this.currentTrack) this.currentTrack.seek = seek;
  };

  onLoaded = (pct: number) => {
    if (this.currentTrack && this.currentTrack.playing)
      this.currentTrack.loaded = this.currentTrack.getPosition(pct);
  };

  clearSeek = () => {
    this.seekPosition = 0;
  };

  get seek() {
    return this.currentTrack ? this.currentTrack.seek : 0;
  }

  get duration() {
    return this.currentTrack ? this.currentTrack.duration : 1;
  }

  get position() {
    return (this.seek / 100) * this.duration;
  }

  get loaded() {
    return this.currentTrack.loaded ? this.currentTrack.loaded : 0;
  }

  get playing() {
    return this.currentTrack ? this.currentTrack.playing : false;
  }

  setVolume = (value: number) => {
    this.volume = value;
  };
}

export default PlayerStore;
