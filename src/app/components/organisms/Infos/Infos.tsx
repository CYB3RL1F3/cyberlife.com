import React, { FC, lazy, Suspense } from 'react';
import { observer } from 'mobx-react';
import {
  InfosBox,
  InfosContainer,
  Paragraph,
  IconHandler,
} from './Infos.styled';
import Audio from 'app/components/atoms/Audio';
import { DesktopAndTabletsMediaQuery } from 'app/components/atoms/Responsive';
import { useInfosStore } from 'app/hooks/stores';
import { Loading } from 'app/components/atoms';
import Button from 'app/components/atoms/Button';
import { SocialLinks } from '../SocialLinks';

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
            <IconHandler>
              <SocialLinks data={data} />
            </IconHandler>

            <Paragraph>
              <br />
              <Button href="/presskit" target="_blank" rel="external nofollow">
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
