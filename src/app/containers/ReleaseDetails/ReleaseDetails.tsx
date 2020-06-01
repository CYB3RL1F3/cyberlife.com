import React, { FC } from 'react';
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
  PlayersHandler
} from './ReleaseDetails.styled';
import { withLoadingStore } from 'app/hoc';
import { Track } from 'types/releases';

import { ReleasePlayer } from 'app/components/molecules';

import Button from 'app/components/atoms/Button';
import { paths } from "app/paths";
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
    styles
  } = data;
  return (
    <Container>
      <TitleHandler>
        <Title>{title}</Title>
        <GoBack path={paths.releases}>&lt; Back</GoBack>
      </TitleHandler>
      <DataContainer>
        <ThumbHandler>
          <PicHandler>
            <Image src={thumb} alt={title} />
          </PicHandler>
          <Button href={discogs} target="_blank">
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
                  <b>-</b> {track.fullTitle}
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
}

export const ReleaseDetails = withLoadingStore(Stores.selected_release)(
  ReleaseDetailsComponent
);

export default ReleaseDetails;