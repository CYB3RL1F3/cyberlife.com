import * as React from 'react';
import { Container, Waveform, Content } from './Track.styled';

export interface TrackProps {
  waveform: string;
  loaded: number;
  seek: number;
  onSeek: (seek: number, toMoveSeekPosition: boolean) => void;
  duration: number;
  isMini: boolean;
}

export class Track extends React.Component<TrackProps> {
  seek = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const loc =
      e.clientX -
      e.currentTarget.offsetLeft -
      e.currentTarget.offsetParent['offsetLeft'];
    const pct = (loc / e.currentTarget.offsetWidth) * 100;

    this.props.onSeek(pct, true);
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
