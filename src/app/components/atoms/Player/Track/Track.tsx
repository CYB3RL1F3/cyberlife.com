import * as React from 'react';
import { Container, Waveform, Content } from './Track.styled';
import { inject, observer } from 'mobx-react';
import { STORE_PLAYER } from 'app/constants/stores';
import PlayerStore from 'app/stores/PlayerStore';

export interface TrackProps {
  waveform: string;
  loaded: number;
  seek: number;
  duration: number;
  isMini: boolean;
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
    const { waveform, loaded, seek, isMini } = this.props;
    return (
      <Container isMini={isMini} onClick={this.seek}>
        <Content opacity={0.3} progression={100} />
        <Content opacity={0.6} progression={loaded} />
        <Content opacity={0.9} progression={seek} />
        <Waveform isMini={isMini} backgroundImage={waveform} />
      </Container>
    );
  }
}
