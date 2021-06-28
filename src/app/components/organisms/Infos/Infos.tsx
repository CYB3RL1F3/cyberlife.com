import React, { FC, lazy, Suspense } from 'react';
import { observer } from 'mobx-react';
import { InfosBox, InfosContainer, Paragraph, A } from './Infos.styled';
import Audio from 'app/components/atoms/Audio';
import { DesktopAndTabletsMediaQuery } from 'app/components/atoms/Responsive';
import { useInfosStore } from 'app/hooks/stores';
import { Loading } from 'app/components/atoms';
import Button from 'app/components/atoms/Button';

const Icon = lazy(() => import('app/components/atoms/Icon'));;
const MiniPlayer = lazy(() => import('app/components/molecules/MiniPlayer'));

export const Infos: FC = observer(() => {
  const infosStore = useInfosStore();
  const { data } = infosStore;
  return (
    <InfosBox>
      {data && data.bio ? (
        <DesktopAndTabletsMediaQuery>
          <InfosContainer>
            <Paragraph>{data.bio.content}</Paragraph>
            <br />
            <Paragraph>
              <A title="Facebook" href={data.facebook} target="_blank">
                <Icon size={25} name="socials/facebook" />
              </A>
              <A title="Twitter" href={data.twitter} target="_blank">
                <Icon size={25} name="socials/twitter" />
              </A>
              <A title="Soundcloud" href={data.soundcloud} target="_blank">
                <Icon size={25} name="socials/soundcloud" />
              </A>
              <A title="Discogs" href={data.discogs} target="_blank">
                <Icon size={25} name="socials/discogs" />
              </A>
              <A title="Resident Advisor" href={data.RA} target="_blank">
                <Icon size={25} name="socials/resident-advisor" />
              </A>
            </Paragraph>

            <Paragraph>
              <br />
              <Button href="/presskit" target="_blank">
                Download Press kit
              </Button>
            </Paragraph>
            <Suspense fallback={<div />}>
              <MiniPlayer />
            </Suspense>
          </InfosContainer>
        </DesktopAndTabletsMediaQuery>
      ) : (
        <Loading />
      )}
      <Audio />
    </InfosBox>
  );
});
