import React, { FC, useCallback, useMemo } from 'react';
import { TrackModel } from 'app/models';
import { observer } from 'mobx-react';
import {
  Container,
  Handler,
  Track,
  TrackHandler,
  Title
} from './ReleasePlayer.styled';

import {
  ButtonHandler,
  IconPlay,
  PlayBtn
} from '../MiniPlayer/MiniPlayer.styled';
import { usePlayerStore } from "app/hooks/stores";

type ReleasePlayerProps = {
  track: TrackModel;
  title: string;
};

export const ReleasePlayer: FC<ReleasePlayerProps> = observer(({ track, title }) => {
  const store = usePlayerStore();
  const { onSeek, play, pause, playing, currentTrack } = store;
  const toggle = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (playing) {
      pause();
      if (currentTrack !== track) {
        play(track);
      }
    } else {
      play(track);
    }
  }, [track, playing, currentTrack, play]);
  const opacity = useMemo(() => track.playing ? 1 : 0.5, [track.playing]);
  return (
    <Handler>
      <Title href={track.soundcloud} target="_blank">
        {title}
      </Title>
      <Container opacity={opacity}>
        <ButtonHandler>
          <PlayBtn onClick={toggle}>
            <IconPlay playing={track.playing} />
          </PlayBtn>
        </ButtonHandler>
        <TrackHandler>
          <Track isMini={false} {...track} onSeek={onSeek} />
        </TrackHandler>
      </Container>
    </Handler>
  );
});
