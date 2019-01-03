import * as React from 'react';
import { format } from 'date-fns';
import { Container, Text, VolumeContainer } from './Footer.styled';
import { Volume } from 'app/components/atoms/Player/Volume/Volume';

export const Footer: React.StatelessComponent = () => (
  <Container>
    <Text>© Cyberlife - {format(new Date(), 'YYYY')}</Text>
    <VolumeContainer>
      <Volume />
    </VolumeContainer>
  </Container>
);
