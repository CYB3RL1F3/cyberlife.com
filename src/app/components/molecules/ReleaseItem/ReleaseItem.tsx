import * as React from 'react';
import { Theme, withTheme } from 'app/theme';
import { Tracks, Track } from '../../../../../types/releases';
import {
  Container,
  ThumbHandler,
  Image,
  InfosHandler,
  Title,
  Tracklist,
  P
} from './ReleaseItem.styled';

export interface ReleaseProps {
  title: string;
  info: string;
  thumb: string;
  theme: Theme;
  tracks: Tracks;
}

export const ReleaseItemComponent: React.StatelessComponent<ReleaseProps> = (
  props: ReleaseProps
) => (
  <Container>
    <ThumbHandler>
      <Image
        placeholderColor={props.theme.color}
        src={props.thumb}
        alt={props.title}
        retry={{
          count: 5,
          delay: 2,
          accumulate: 'add'
        }}
      />
    </ThumbHandler>
    <InfosHandler>
      <Title>{props.title}</Title>
      <P>{props.info}</P>
      <Tracklist>
        {props.tracks.map((track: Track) => (
          <P>{track.title}</P>
        ))}
      </Tracklist>
    </InfosHandler>
  </Container>
);

export const ReleaseItem = withTheme(ReleaseItemComponent);
