import * as React from 'react';
import { ReleaseModel } from 'app/models';
import { STORE_SELECTED_RELEASE } from 'app/constants';
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
  A
} from './ReleaseDetails.styled';
import { withLoadingStore } from 'app/hoc';
import { Track } from 'types/releases';
export interface ReleaseDetailsProps {
  data: ReleaseModel;
  [STORE_SELECTED_RELEASE]: SelectedReleaseStore;
}

export class ReleaseDetailsComponent extends React.Component<{}, {}> {
  render() {
    const store: SelectedReleaseStore = this.props[STORE_SELECTED_RELEASE];
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
            <P>
              {label} - {cat}
            </P>
            <P>{styles.join(' / ')}</P>
            <P>released on {releaseDateFormatted}</P>
            {tracks && tracks.length > 0 && (
              <Tracklist>
                {tracks.map((track: Track) => (
                  <P key={track.title}>{track.fullTitle}</P>
                ))}
              </Tracklist>
            )}
            <A href={discogs} target="_blank">
              View more infos on Discogs
            </A>
          </TextHandler>
        </DataContainer>
      </Container>
    );
  }
}
export const ReleaseDetails = withLoadingStore(STORE_SELECTED_RELEASE)(
  ReleaseDetailsComponent
);
