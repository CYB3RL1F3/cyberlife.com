import * as React from 'react';
import { Background, Bg1, Bg2, Bg3, Waveform } from './Layout.styled';

export const Layout = ({ children }): JSX.Element => (
  <Background>
    <Bg1>
      <Bg2>
        <Bg3>
          <Waveform>{children}</Waveform>
        </Bg3>
      </Bg2>
    </Bg1>
  </Background>
);
