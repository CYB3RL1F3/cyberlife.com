import React from 'react';
import { format } from 'date-fns';
import { Container, Text, VolumeContainer, A } from './Footer.styled';
import { Volume } from 'app/components/atoms/Player/Volume/Volume';

export const Footer: React.StatelessComponent = () => (
  <Container>
    <Text>
      © <A href="https://github.com/CYB3RL1F3">Cyberlife</A> -{' '}
      {format(new Date(), 'yyyy')}
    </Text>
    <VolumeContainer>
      <Volume />
    </VolumeContainer>
  </Container>
);
