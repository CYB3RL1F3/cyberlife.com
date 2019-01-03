import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { STORE_INFOS } from 'app/constants';
import { InfosBox, InfosContainer, Paragraph, A } from './Infos.styled';
import InfosStore from 'app/stores/InfosStore';
import { Audio } from 'app/components/atoms/Audio';
import { MiniPlayer } from 'app/components/atoms/Player';

@inject(STORE_INFOS)
@observer
export class Infos extends React.Component {
  render() {
    const infosStore: InfosStore = this.props[STORE_INFOS] as InfosStore;
    const discogs = `https://discogs.com/artist/${infosStore.data.discogs}`;
    return (
      <InfosBox>
        <InfosContainer>
          <Paragraph>{infosStore.data.bio.content}</Paragraph>
          <br />
          <Paragraph>
            <A href={infosStore.data.facebook}>Facebook</A> -&nbsp;
            <A href={infosStore.data.twitter}>Twitter</A> -&nbsp;
            <A href={infosStore.data.soundcloud}>Soundcloud</A> -&nbsp;
            <A href={discogs}>Discogs</A> -&nbsp;
            <A href={infosStore.data.RA}>Resident Advisor</A>
          </Paragraph>
          <MiniPlayer />
        </InfosContainer>
        <Audio />
      </InfosBox>
    );
  }
}
