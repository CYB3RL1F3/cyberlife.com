import React, { FC } from 'react';
import {
  Container,
  ErrorTitle,
  ErrorMessage,
  GetBack,
  ErrorHandler
} from './Err404.styled';
import { paths } from "app/paths";

export const Err404: FC = () => (
  <Container>
    <ErrorTitle>404</ErrorTitle>
    <ErrorMessage>Nothing here...</ErrorMessage>
    <ErrorHandler>
      <GetBack path={paths.podcasts}>Follow the right path</GetBack>
    </ErrorHandler>
  </Container>
);
