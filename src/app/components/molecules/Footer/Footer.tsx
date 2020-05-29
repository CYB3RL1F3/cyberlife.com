import React, { FC, Suspense, lazy, memo } from 'react';
import { format } from 'date-fns';
import { Container, Text, VolumeContainer, A } from './Footer.styled';
const Volume = lazy(() => import('app/components/atoms/Volume'));

export const Footer: FC = memo(() => (
  <Container>
    <Text>
      © <A href="https://github.com/CYB3RL1F3">Cyberlife</A> -{' '}
      {format(new Date(), 'yyyy')}
    </Text>
    <VolumeContainer>
      <Suspense fallback={<div />}>
        <Volume />
      </Suspense>
    </VolumeContainer>
  </Container>
));
