import React from 'react';
import {
  Container,
  ErrorTitle,
  ErrorMessage,
  GetBack,
  ErrorHandler
} from './Err404.styled';

export const Err404: React.StatelessComponent = () => (
  <Container>
    <ErrorTitle>404</ErrorTitle>
    <ErrorMessage>Nothing here...</ErrorMessage>
    <ErrorHandler>
      <GetBack path="/">Follow the right path</GetBack>
    </ErrorHandler>
  </Container>
);
