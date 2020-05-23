import React, { FC, useCallback, MouseEvent } from 'react';
import { Theme, withTheme } from 'app/theme';
import { Tracks } from 'types/playlists';
import {
  Container,
  ThumbHandler,
  InfosHandler,
  Title,
  Description,
  Handler,
  TrackHandler,
  PodcastLink
} from './PodcastItem.styled';
import { PlayBtn, Track } from 'app/components/atoms/Player';
import { DesktopAndTabletsMediaQuery } from 'app/components/atoms/Responsive';
import { paths, resolvePath } from 'app/paths';

export interface PodcastItemProps {
  id: number;
  title: string;
  description: string;
  artwork: string;
  theme: Theme;
  tracks: Tracks;
  index: number;
  date: number;
  playing: boolean;
  duration: number;
  waveform: string;
  loaded: number;
  seek: number;
  onPlay: (e: React.MouseEvent, index: number) => void;
  onSeek: (seek: number, toMoveSeekPosition: boolean) => void;
}

export const PodcastItemComponent: FC<PodcastItemProps> = (
  {
    onPlay,
    index,
    artwork,
    playing,
    title,
    id,
    description,
    waveform,
    loaded,
    seek,
    duration,
    onSeek
  }
) => {
  const play = useCallback((e: MouseEvent) => onPlay(e, index), [onPlay, index]);
  return (
    <Container index={index}>
      <ThumbHandler>
        <PlayBtn
          backgroundImage={artwork}
          playing={playing}
          onClick={play}
        />
      </ThumbHandler>
      <InfosHandler>
        <Title>
          <PodcastLink path={resolvePath(paths.podcastDetails, id)}>
            {title}
          </PodcastLink>
        </Title>
        <Handler>
          <Description>{description}</Description>
        </Handler>
        <DesktopAndTabletsMediaQuery>
          <TrackHandler opacity={playing ? 1 : 0.5}>
            <Track
              waveform={waveform}
              loaded={loaded}
              seek={seek}
              duration={duration}
              isMini={false}
              onSeek={onSeek}
            />
          </TrackHandler>
        </DesktopAndTabletsMediaQuery>
      </InfosHandler>
    </Container>
  )
};

export const PodcastItem = withTheme(PodcastItemComponent);
