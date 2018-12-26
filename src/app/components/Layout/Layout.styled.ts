import styled, { css } from 'app/theme';
const bg1 = require('assets/images/bg1.png');
const bg2 = require('assets/images/bg2.png');
const bg3 = require('assets/images/bg3.png');
const waveform = require('assets/images/waveform.png');

const BackgroundLayer = css`
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
`;

export const Background = styled.div`
  ${BackgroundLayer};
  background-image: ${({ theme }) =>
    `linear-gradient(to right, ${theme.background.fromColor}, ${
      theme.background.toColor
    });`};
`;

export const Bg1 = styled.div`
  ${BackgroundLayer};
  background-image: url(${bg1});
  background-repeat: no-repeat;
  background-position: 0% 90%;
  background-size: 100% auto;
`;

export const Bg2 = styled.div`
  ${BackgroundLayer};
  background-image: url(${bg2});
  background-repeat: no-repeat;
  background-position: 0% 100%;
  background-size: 100% auto;
`;

export const Bg3 = styled.div`
  ${BackgroundLayer};
  background-image: url(${bg3});
  background-repeat: no-repeat;
  background-position: left top;
  background-size: 100% auto;
`;

export const Waveform = styled.div`
  ${BackgroundLayer};
  background-image: url(${waveform});
  background-repeat: no-repeat;
  background-position: 0% 90%;
  background-size: 100% auto;
`;
