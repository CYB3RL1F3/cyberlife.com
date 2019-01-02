import * as React from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { inject, observer } from 'mobx-react';
import { STORE_PLAYER } from 'app/constants/stores';
import { PlayerStore } from 'app/stores';

export interface AudioProps {}

@inject(STORE_PLAYER)
@observer
export class Audio extends React.Component<AudioProps> {
  player = null;
  native = null;

  refer = (ref) => {
    this.player = ref;
    this.native = ref && ref.audioEl;
  };

  seekTo = (value: number) => {
    this.native.seekTo(value);
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
