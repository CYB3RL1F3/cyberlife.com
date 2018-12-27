import * as React from 'react';
import { Container, ErrorTitle, ErrorMessage } from './Error.styled';

interface ErrorProps {
  message: string;
}

export const Error: React.StatelessComponent<ErrorProps> = ({ message }) => (
  <Container>
    <ErrorTitle>Error !</ErrorTitle>
    <ErrorMessage>{message}</ErrorMessage>
  </Container>
);
