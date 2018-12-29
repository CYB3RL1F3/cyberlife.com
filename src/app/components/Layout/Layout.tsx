import * as React from 'react';
import {
  Background,
  Bg1,
  Bg2,
  Bg3,
  Waveform,
  ChildrenHandler
} from './Layout.styled';

export const Layout = ({ children }): JSX.Element => (
  <Background>
    <Bg1>
      <Bg2>
        <Bg3>
          <Waveform />
          <ChildrenHandler>{children}</ChildrenHandler>
        </Bg3>
      </Bg2>
    </Bg1>
  </Background>
);
