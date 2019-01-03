import * as React from 'react';
import { Container, Waveform } from './Track.styled';
import { inject, observer } from 'mobx-react';
import { STORE_PLAYER } from 'app/constants/stores';
import PlayerStore from 'app/stores/PlayerStore';

export interface TrackProps {
  waveform: string;
  loaded: number;
  seek: number;
  duration: number;
}

@inject(STORE_PLAYER)
@observer
export class Track extends React.Component<TrackProps> {
  seek = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const loc = e.clientX - e.currentTarget.offsetLeft;
    const pct = (loc / e.currentTarget.offsetWidth) * 100;
    const store: PlayerStore = this.props[STORE_PLAYER] as PlayerStore;
    store.onSeek(pct, true);
  };

  trackRef = null;

  render() {
    const { waveform, loaded, seek } = this.props;
    return (
      <Container className="trakk" onClick={this.seek}>
        <Waveform backgroundImage={waveform} opacity={0.3} progression={100} />
        <Waveform
          backgroundImage={waveform}
          opacity={0.6}
          progression={loaded}
        />
        <Waveform backgroundImage={waveform} opacity={0.9} progression={seek} />
      </Container>
    );
  }
}
