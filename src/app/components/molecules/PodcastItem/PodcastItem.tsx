import * as React from 'react';
import { Theme, withTheme } from 'app/theme';
import { Tracks } from '../../../../../types/playlists';
import {
  Container,
  ThumbHandler,
  InfosHandler,
  Title,
  P
} from './PodcastItem.styled';
import { format } from 'date-fns';
import { PlayBtn } from 'app/components/atoms/Player';

console.log(Container, ThumbHandler, Image, InfosHandler, Title, P);

export interface PodcastItemProps {
  title: string;
  description: string;
  artwork: string;
  theme: Theme;
  tracks: Tracks;
  index: number;
  date: number;
  playing: boolean;
  onPlay: (e: React.MouseEvent) => void;
}

export const PodcastItemComponent: React.StatelessComponent<
  PodcastItemProps
> = (props: PodcastItemProps) => {
  console.log(props.artwork);
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
      </InfosHandler>
    </Container>
  );
};

export const PodcastItem = withTheme(PodcastItemComponent);
