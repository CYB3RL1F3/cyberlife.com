import * as React from 'react';
import { Container, Spinner } from './Loader.styled';

export const Loader: React.StatelessComponent = () => (
  <Container>
    <Spinner />
  </Container>
);
