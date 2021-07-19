import React, { FC, Suspense, lazy, memo } from 'react';
import { format } from 'date-fns';
import { Container, Text, VolumeContainer, A, Link } from './Footer.styled';
const Volume = lazy(() => import('app/components/atoms/Volume'));
import { paths } from 'app/paths';

export const Footer: FC = memo(() => (
  <Container>
    <Text>
      <span>
        © <A href="https://github.com/CYB3RL1F3">Cyberlife</A> -{' '}
        {format(new Date(), 'yyyy')} -{' '}
        <Link path={paths.about}>About website</Link>
      </span>
    </Text>
    <VolumeContainer>
      <Suspense fallback={<div />}>
        <Volume />
      </Suspense>
    </VolumeContainer>
  </Container>
));
