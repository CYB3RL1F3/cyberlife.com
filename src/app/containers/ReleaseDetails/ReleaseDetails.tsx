import React, { FC, lazy, Suspense } from 'react';
import { ReleaseModel } from 'app/models';
import { Stores } from 'app/constants';
import {
  Container,
  TitleHandler,
  Title,
  GoBack,
  Image,
  DataContainer,
  PicHandler,
  TextHandler,
  P,
  Tracklist,
  ThumbHandler,
  PlayersHandler,
  A,
} from './ReleaseDetails.styled';
import { withLoadingStore } from 'app/hoc';
import { Track } from 'types/releases';

import { ReleasePlayer } from 'app/components/molecules';

import Button from 'app/components/atoms/Button';
import Heads from 'app/components/atoms/Heads';
import { paths } from 'app/paths';

const Icon = lazy(() => import('app/components/atoms/Icon'));
export interface ReleaseDetailsProps {
  data: ReleaseModel;
}

export const ReleaseDetailsComponent: FC<ReleaseDetailsProps> = ({ data }) => {
  if (!data) return null;
  const {
    title,
    thumb,
    tracklist: tracks,
    releaseDateFormatted,
    cat,
    label,
    discogs,
    styles,
  } = data;
  const url = window.document.location.href;
  const description = `${label} (${cat})\nRelease date: ${releaseDateFormatted}`;
  return (
    <Container>
      <Heads
        title={`Cyberlife - ${title}`}
        description={description}
        image={thumb}
        url={url}
        ogType="article"
      />
      <TitleHandler>
        <Title>{title}</Title>
        <GoBack path={paths.releases}>
          <Suspense fallback={<span />}>
            <Icon name="go-back" size={18} />
          </Suspense>
        </GoBack>
      </TitleHandler>
      <DataContainer>
        <ThumbHandler>
          <PicHandler picture={thumb}>
            <Image src={thumb} alt={title} />
          </PicHandler>
          <Button href={discogs} target="_blank" rel="external nofollow">
            Get Vinyl
          </Button>
        </ThumbHandler>
        <TextHandler>
          <P>Label: {label}</P>
          <P>Cat: {cat}</P>
          <P>Release date: {releaseDateFormatted}</P>
          <P>{styles.join(' / ')}</P>
          <br />
          <P>Tracklist: </P>
          {tracks && tracks.length > 0 && (
            <Tracklist>
              {tracks.map((track: Track) => (
                <P key={track.title}>
                  <b>-</b>
                  <A
                    rel="external nofollow"
                    target="_blank"
                    href={new URL(
                      `https://www.youtube.com/results?search_query=${track.fullTitle}`
                    ).toString()}
                  >
                    {track.fullTitle}
                  </A>
                </P>
              ))}
            </Tracklist>
          )}
        </TextHandler>
      </DataContainer>
      <PlayersHandler>
        {tracks.map(
          (track: Track) =>
            track.stream !== null && (
              <ReleasePlayer
                key={track.stream.id}
                title={track.fullTitle}
                track={track.stream}
              />
            )
        )}
      </PlayersHandler>
    </Container>
  );
};

export const ReleaseDetails = withLoadingStore(Stores.selected_release)(
  ReleaseDetailsComponent
);

export default ReleaseDetails;
