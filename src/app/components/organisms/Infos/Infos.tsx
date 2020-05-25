import React, { FC, lazy, Suspense } from 'react';
import { observer } from 'mobx-react';
import { InfosBox, InfosContainer, Paragraph, A } from './Infos.styled';
import Audio from 'app/components/atoms/Audio';
import { DesktopAndTabletsMediaQuery } from 'app/components/atoms/Responsive';
import { useInfosStore } from 'app/hooks/stores';
import { Loading } from 'app/components/atoms';
const MiniPlayer = lazy(() => import('app/components/atoms/Player/MiniPlayer'));

export const Infos: FC = observer(() => {
  const infosStore = useInfosStore();
  const { data } = infosStore;
  if (data && data.bio) {
    return (
      <InfosBox>
        <DesktopAndTabletsMediaQuery>
          <InfosContainer>
            <Paragraph>{data.bio.content}</Paragraph>
            <br />
            <Paragraph>
              <A href={data.facebook}>Facebook</A> -&nbsp;
              <A href={data.twitter}>Twitter</A> -&nbsp;
              <A href={data.soundcloud}>Soundcloud</A> -&nbsp;
              <A href={data.discogs}>Discogs</A> -&nbsp;
              <A href={data.RA}>Resident Advisor</A>
            </Paragraph>
            <Suspense fallback={<div />}>
              <MiniPlayer />
            </Suspense>
          </InfosContainer>
        </DesktopAndTabletsMediaQuery>
        <Audio />
      </InfosBox>
    );
  } else {
    return (
      <InfosBox>
        <Loading />
      </InfosBox>
    )
  }
  
});
