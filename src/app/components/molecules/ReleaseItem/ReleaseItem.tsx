import * as React from 'react';
import { Theme, withTheme } from 'app/theme';
import { Track } from 'types/releases';
import {
  Container,
  ThumbHandler,
  Image,
  InfosHandler,
  Title,
  Tracklist,
  P
} from './ReleaseItem.styled';
import { ReleaseModel } from 'app/models';

export interface ReleaseProps {
  theme: Theme;
  release: ReleaseModel;
  index: number;
}

export const ReleaseItemComponent: React.StatelessComponent<ReleaseProps> = (
  props: ReleaseProps
) => {
  const { name, cyberlifeTracks, thumb, label, releaseDate } = props.release;
  const { picturePlaceholder } = props.theme;
  return (
    <Container index={props.index}>
      <ThumbHandler>
        <Image
          placeholderColor={picturePlaceholder}
          src={thumb}
          alt={name}
          retry={{ count: 5, delay: 2, accumulate: 'add' }}
        />
      </ThumbHandler>
      <InfosHandler>
        <Title>{name}</Title>
        <P>{label}</P>
        <P>Released on {releaseDate}</P>
        {cyberlifeTracks && cyberlifeTracks.length > 0 && (
          <Tracklist>
            {cyberlifeTracks.map((track: Track) => (
              <P key={track.title}>{track.title}</P>
            ))}
          </Tracklist>
        )}
      </InfosHandler>
    </Container>
  );
};

export const ReleaseItem = withTheme(ReleaseItemComponent);
