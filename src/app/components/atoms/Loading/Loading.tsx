import React, { FC } from 'react';
import { Container, Spinner } from './Loading.styled';

export const Loading: FC = () => (
  <Container>
    <Spinner />
  </Container>
);
