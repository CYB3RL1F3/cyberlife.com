import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { STORE_INFOS } from 'app/constants';
import { InfosBox, InfosContainer, Paragraph, A } from './Infos.styled';
import InfosStore from 'app/stores/InfosStore';
import { Audio } from 'app/components/atoms/Audio';
import { MiniPlayer } from 'app/components/atoms/Player';
import { DesktopAndTabletsMediaQuery } from 'app/components/atoms/Responsive';

@inject(STORE_INFOS)
@observer
export class Infos extends React.Component {
  render() {
    const infosStore: InfosStore = this.props[STORE_INFOS] as InfosStore;
    return (
      <InfosBox>
        <DesktopAndTabletsMediaQuery>
          <InfosContainer>
            <Paragraph>{infosStore.data.bio.content}</Paragraph>
            <br />
            <Paragraph>
              <A href={infosStore.data.facebook}>Facebook</A> -&nbsp;
              <A href={infosStore.data.twitter}>Twitter</A> -&nbsp;
              <A href={infosStore.data.soundcloud}>Soundcloud</A> -&nbsp;
              <A href={infosStore.data.discogs}>Discogs</A> -&nbsp;
              <A href={infosStore.data.RA}>Resident Advisor</A>
            </Paragraph>
            <MiniPlayer />
          </InfosContainer>
        </DesktopAndTabletsMediaQuery>
        <Audio />
      </InfosBox>
    );
  }
}
