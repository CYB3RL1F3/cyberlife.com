import React, { PureComponent } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { inject, observer } from 'mobx-react';
import { STORE_PLAYER } from 'app/constants/stores';
import { PlayerStore } from 'app/stores';
import { debounce } from 'app/utils/debounce';

interface AudioElement {
  current: HTMLAudioElement;
}
export interface AudioProps {}

@inject(STORE_PLAYER)
@observer
export class Audio extends PureComponent<AudioProps> {
  player: ReactAudioPlayer = null;
  element: AudioElement = null;

  refer = (ref) => {
    this.player = ref;
    this.element = ref && ref.audioEl;
  };

  seekTo = (value: number) => {
    if (this.element && this.element.current) this.element.current.currentTime = value;
  };

  onListen = (value: number) => {
    const store: PlayerStore = this.props[STORE_PLAYER];
    if (this.element && this.element.current) {
      const { buffered } = this.element.current;
      if (buffered) {
        const pctLoaded = 100 * buffered.end(0) / store.currentTrack.duration;
        store.onLoaded(pctLoaded);
      }
    }
    if (store.seekPosition > 0 && this.element && this.element.current) {
      this.element.current.currentTime =
        (store.seekPosition / 100) * (store.currentTrack.duration / 1000);
      store.clearSeek();
    } else {
      const pct = (value / (store.currentTrack.duration / 1000)) * 100;
      store.onSeek(pct, false);
    }
  };

  componentWillUnmount = () => {
    this.player = null;
    this.element = null;
  }

  render() {
    const store: PlayerStore = this.props[STORE_PLAYER] as PlayerStore;
    if (store.currentTrack) {
      const {
        currentTrack: { url, playing },
        volume
      } = store;
      if (url && playing) {
        return (
          <ReactAudioPlayer
            ref={this.refer}
            withRef
            src={url}
            listenInterval={200}
            onListen={debounce(this.onListen, 200)}
            controls={false}
            autoPlay
            volume={volume}
          />
        );
      }
    }
    return <div />;
  }
}

export default Audio;