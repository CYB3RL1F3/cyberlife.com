import * as React from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { inject, observer } from 'mobx-react';
import { STORE_PLAYER } from 'app/constants/stores';
import { PlayerStore } from 'app/stores';

export interface AudioProps {}

@inject(STORE_PLAYER)
@observer
export class Audio extends React.Component<AudioProps> {
  player: ReactAudioPlayer = null;
  element: HTMLAudioElement = null;

  refer = (ref) => {
    this.player = ref;
    this.element = ref && ref.audioEl;
  };

  seekTo = (value: number) => {
    if (this.element) this.element.currentTime = value;
  };

  onListen = (value: number) => {
    const store: PlayerStore = this.props[STORE_PLAYER];
    if (store.jumpTo > 0 && this.element) {
      this.element.currentTime =
        (store.jumpTo / 100) * (store.currentTrack.duration / 1000);
      store.clearJump();
    } else {
      const pct = (value / (store.currentTrack.duration / 1000)) * 100;
      store.onSeek(pct, false);
    }
  };

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
            listenInterval={100}
            onListen={this.onListen}
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
