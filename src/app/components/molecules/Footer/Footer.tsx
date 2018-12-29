import * as React from 'react';
import { format } from 'date-fns';
import { Container, Text } from './Footer.styled';

export const Footer: React.StatelessComponent = () => (
  <Container>
    <Text>© Cyberlife - {format(new Date(), 'YYYY')}</Text>
  </Container>
);
