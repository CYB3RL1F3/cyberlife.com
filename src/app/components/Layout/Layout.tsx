import React from 'react';
import { Background, Bg } from './Layout.styled';
import { BackgroundVideo } from 'app/components/atoms';
import { ChildrenHandler } from './ChildrenHandler';

export const Layout = ({ children }): JSX.Element => (
  <Background>
    <Bg children={<BackgroundVideo />} />
    <ChildrenHandler children={children} />
  </Background>
);
