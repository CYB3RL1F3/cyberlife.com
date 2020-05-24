import React, { FC, useCallback } from 'react';
import { Container, Waveform, Content } from './Track.styled';

export interface TrackProps {
  waveform: string;
  loaded: number;
  seek: number;
  onSeek: (seek: number, toMoveSeekPosition: boolean) => void;
  duration: number;
  isMini: boolean;
  className?: string;
}

export const Track: FC<TrackProps> = ({ waveform, className, loaded, seek, isMini, onSeek }) => {
  const moveSeek = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const loc =
      e.clientX -
      e.currentTarget.offsetLeft -
      (e.currentTarget.offsetParent as HTMLDivElement).offsetLeft;
    const pct = (loc / e.currentTarget.offsetWidth) * 100;
    onSeek(pct, true);
  }, [onSeek]);

  return (
    <Container className={className} isMini={isMini} onClick={moveSeek}>
      <Content opacity={0.3} progression={100} />
      <Content opacity={0.2} progression={loaded} />
      <Content opacity={0.9} progression={seek} />
      <Waveform isMini={isMini} backgroundImage={waveform} />
    </Container>
  );
}
