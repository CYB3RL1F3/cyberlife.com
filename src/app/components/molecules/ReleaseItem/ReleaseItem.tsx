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
  index: number;
}

export const ReleaseItemComponent: React.StatelessComponent<ReleaseProps> = (
  props: ReleaseProps
) => (
  <Container index={props.index}>
    <ThumbHandler>
      <Image
        placeholderColor={props.theme.picturePlaceholder}
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
      {props.tracks && props.tracks.length > 0 && (
        <Tracklist>
          {props.tracks.map((track: Track) => (
            <P key={track.title}>{track.title}</P>
          ))}
        </Tracklist>
      )}
    </InfosHandler>
  </Container>
);

export const ReleaseItem = withTheme(ReleaseItemComponent);
