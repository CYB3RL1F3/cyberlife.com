import React from 'react';
import { Container, ErrorTitle, ErrorMessage, A } from './Error.styled';

interface ErrorProps {
  message: string;
  init: () => void;
}

export const Error: React.StatelessComponent<ErrorProps> = ({
  message,
  init
}) => (
  <Container>
    <ErrorTitle>Error !</ErrorTitle>
    <ErrorMessage>{message}</ErrorMessage>
    <ErrorMessage>
      You can still <A onClick={init}>retry to load content.</A>
    </ErrorMessage>
  </Container>
);
