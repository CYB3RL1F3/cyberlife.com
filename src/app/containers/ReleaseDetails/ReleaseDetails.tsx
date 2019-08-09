import * as React from 'react';
import { ReleaseModel } from 'app/models';
import { STORE_SELECTED_RELEASE, STORE_PLAYER } from 'app/constants';
import SelectedReleaseStore from 'app/stores/SelectedReleaseStore';
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
  A,
  PlayersHandler
} from './ReleaseDetails.styled';
import { withLoadingStore } from 'app/hoc';
import { Track } from 'types/releases';
import { inject, observer } from 'mobx-react';
import { PlayerStore } from 'app/stores';
import { ReleasePlayer } from 'app/components/atoms/Player/ReleasePlayer/ReleasePlayer';
export interface ReleaseDetailsProps {
  data: ReleaseModel;
  [STORE_SELECTED_RELEASE]: SelectedReleaseStore;
  [STORE_PLAYER]: PlayerStore;
}
@inject(STORE_PLAYER)
@observer
export class ReleaseDetailsComponent extends React.Component<{}, {}> {
  render() {
    const store: SelectedReleaseStore = this.props[STORE_SELECTED_RELEASE];
    if (!store.data) return null;
    const {
      title,
      thumb,
      tracklist: tracks,
      releaseDateFormatted,
      cat,
      label,
      discogs,
      styles
    } = store.data;
    return (
      <Container>
        <TitleHandler>
          <Title>{title}</Title>
          <GoBack path="/releases">&lt; Back</GoBack>
        </TitleHandler>
        <DataContainer>
          <PicHandler>
            <Image src={thumb} alt={title} />
          </PicHandler>
          <TextHandler>
            {tracks && tracks.length > 0 && (
              <Tracklist>
                {tracks.map((track: Track) => (
                  <P key={track.title}>{track.fullTitle}</P>
                ))}
              </Tracklist>
            )}
            <P>
              {label} ({cat})
            </P>
            <P>Released on {releaseDateFormatted}</P>
            <P>{styles.join(' / ')}</P>
            <br />
            <A href={discogs} target="_blank">
              View more infos on Discogs
            </A>
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
}
export const ReleaseDetails = withLoadingStore(STORE_SELECTED_RELEASE)(
  ReleaseDetailsComponent
);
