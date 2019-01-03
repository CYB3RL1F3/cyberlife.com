import * as React from 'react';
import { Theme, withTheme } from 'app/theme';
import { Tracks } from '../../../../../types/playlists';
import {
  Container,
  ThumbHandler,
  InfosHandler,
  Title,
  P,
  TrackHandler
} from './PodcastItem.styled';
import { format } from 'date-fns';
import { PlayBtn, Track } from 'app/components/atoms/Player';

export interface PodcastItemProps {
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
  onPlay: (e: React.MouseEvent) => void;
}

export const PodcastItemComponent: React.StatelessComponent<
  PodcastItemProps
> = (props: PodcastItemProps) => {
  return (
    <Container index={props.index}>
      <ThumbHandler>
        <PlayBtn
          backgroundImage={props.artwork}
          playing={props.playing}
          onClick={props.onPlay}
        />
      </ThumbHandler>
      <InfosHandler>
        <Title>{props.title}</Title>
        <P>{format(props.date, 'DD/MM/YYYY')}</P>
        <TrackHandler opacity={props.playing ? 1 : 0.5}>
          <Track
            waveform={props.waveform}
            loaded={props.loaded}
            seek={props.seek}
            duration={props.duration}
            isMini={false}
          />
        </TrackHandler>
      </InfosHandler>
    </Container>
  );
};

export const PodcastItem = withTheme(PodcastItemComponent);
