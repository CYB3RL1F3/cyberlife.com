import * as React from 'react';
import { Background, Bg, ChildrenHandler } from './Layout.styled';
import { BackgroundVideo } from 'app/components/atoms';

export const Layout = ({ children }): JSX.Element => (
  <Background id="l">
    <Bg children={<BackgroundVideo />} />
    <ChildrenHandler children={children} />
  </Background>
);
