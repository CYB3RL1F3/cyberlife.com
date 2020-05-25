import React, { FC, memo } from 'react';
import { Container, Spinner } from './Loading.styled';

export const Loading: FC = memo(() => (
  <Container>
    <Spinner />
  </Container>
));
