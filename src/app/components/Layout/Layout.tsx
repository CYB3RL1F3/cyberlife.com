import * as React from 'react';
import { Background } from './Layout.styled';

export const Layout = ({ children }): JSX.Element => (
  <Background>{children}</Background>
);
