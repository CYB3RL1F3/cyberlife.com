import React, { FC, useCallback, MouseEvent, memo } from 'react';
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
import { PlayBtn, Track } from 'app/components/atoms';
import { DesktopAndTabletsMediaQuery } from 'app/components/atoms/Responsive';
import { paths, resolvePath } from 'app/paths';

export interface PodcastItemProps {
  id: number;
  title: string;
  description: string;
  artwork: string;
  theme: Theme;
  tracks: Tracks;
  date: number;
  playing: boolean;
  duration: number;
  waveform: string;
  loaded: number;
  seek: number;
  index: number;
  onPlay: (e: MouseEvent, index: number) => void;
  onSeek: (seek: number, toMoveSeekPosition: boolean) => void;
}

export const PodcastItemComponent: FC<PodcastItemProps> = (
  {
    index,
    onPlay,
    onSeek,
    artwork,
    playing,
    title,
    id,
    description,
    waveform,
    loaded,
    seek,
    duration
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

export const PodcastItem = memo(withTheme(PodcastItemComponent));

export default PodcastItem;