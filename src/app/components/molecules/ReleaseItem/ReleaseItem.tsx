import React, { FC } from 'react';
import { Theme, withTheme } from 'app/theme';
import { Track } from 'types/releases';
import {
  Container,
  ThumbHandler,
  Image,
  InfosHandler,
  Title,
  Tracklist,
  TitleLink,
  P,
  A
} from './ReleaseItem.styled';
import { ReleaseModel } from 'app/models';
import { paths, resolvePath } from "app/paths";

export interface ReleaseProps {
  theme: Theme;
  index: number;
  release: ReleaseModel;
}

export const ReleaseItemComponent: FC<ReleaseProps> = (
  props: ReleaseProps
) => {
  const {
    title,
    id,
    cyberlifeTracks: tracks,
    thumb,
    label,
    releaseDateFormatted
  } = props.release;
  const { picturePlaceholder } = props.theme;
  const link = resolvePath(paths.releaseDetails, id);
  return (
    <Container index={props.index}>
      <ThumbHandler>
        <A path={link}>
          <Image
            placeholderColor={picturePlaceholder}
            src={thumb}
            alt={title}
            noLazyLoad={true}
            retry={{ count: 5, delay: 2, accumulate: 'add' }}
          />
        </A>
      </ThumbHandler>
      <InfosHandler>
        <Title>
          <TitleLink path={link}>{title}</TitleLink>
        </Title>
        <P>{label}</P>
        <P>Released on {releaseDateFormatted}</P>
        {tracks && tracks.length > 0 && (
          <Tracklist>
            {tracks.map((track: Track) => (
              <P key={track.title}>{track.title}</P>
            ))}
          </Tracklist>
        )}
      </InfosHandler>
    </Container>
  );
};

export const ReleaseItem = withTheme(ReleaseItemComponent);
