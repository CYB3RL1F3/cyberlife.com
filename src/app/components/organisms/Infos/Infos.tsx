import React, { FC } from 'react';
import { observer } from 'mobx-react';
import { InfosBox, InfosContainer, Paragraph, A } from './Infos.styled';
import { Audio } from 'app/components/atoms/Audio';
import { MiniPlayer } from 'app/components/atoms/Player';
import { DesktopAndTabletsMediaQuery } from 'app/components/atoms/Responsive';
import { useInfosStore } from 'app/hooks/stores';

export const Infos: FC = observer(() => {
  const infosStore = useInfosStore();
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
});
