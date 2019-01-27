import styled, { css, keyframes } from 'app/theme';
import { range, getHue, getNbSeconds } from 'app/utils/hue';
const bg1 = require('assets/images/bg1.png');
const bg2 = require('assets/images/bg2.png');
const bg3 = require('assets/images/bg3.png');
const waveform = require('assets/images/waveform.png');

const animatingBg = keyframes`
  0% {
    filter: hue-rotate(${range}deg);
  }
  50% {
    filter: hue-rotate(${-range}deg);
  }
  100% {
    filter: hue-rotate(${range}deg);
  }
`;

const BackgroundLayer = css`
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  position: absolute;
  z-index: 0;
  ${({ theme }) => theme.media.mobile`
    @supports (-webkit-appearance:none) {
      ${({ theme }) =>
        theme.isAndroid && !theme.isFirefox
          ? 'height: calc(100vh - 56px);'
          : ''}
    }
  `};
`;

export const Background = styled.div`
  ${BackgroundLayer};
  background-image: ${({ theme }) =>
    `linear-gradient(to right, ${theme.background.fromColor}, ${
      theme.background.toColor
    });`};
  filter: hue-rotate(${getHue()});
  animation: ${animatingBg} 86400s linear infinite;
  animation-delay: ${-getNbSeconds()}s;
`;

export const Bg1 = styled.div`
  ${BackgroundLayer};
  background-image: url(${bg1});
  background-repeat: no-repeat;
  background-position: 0% 90%;
  background-size: 100% auto;
  filter: blur(7px);
`;

export const Bg2 = styled.div`
  ${BackgroundLayer};
  background-image: url(${bg2});
  background-repeat: no-repeat;
  background-position: 0% 100%;
  background-size: 100% auto;
  filter: blur(10px);
`;

export const Bg3 = styled.div`
  ${BackgroundLayer};
  background-image: url(${bg3});
  background-repeat: no-repeat;
  background-position: left top;
  background-size: 100% auto;
  filter: blur(5px);
`;

const initialClip = css`
  clip: rect(0, 0, 100vh, 0);
`;

export const waveformAnimation = keyframes`
  from {
    ${initialClip}
  }
  to {
    clip: rect(0, 100vw, 100vh, 0);
  }
`;

export const Waveform = styled.div`
  ${BackgroundLayer}
  ${initialClip}
  animation-delay: 0.15;
  animation: ${waveformAnimation} 0.5s linear forwards;
  background-image: url(${waveform});
  background-repeat: no-repeat;
  background-position: 0% 90%;
  background-size: 100% auto;

  opacity: 0.75;
  ${({ theme }) => theme.media.mobile`
    opacity: 0.2;
  `}
`;

export const ChildrenHandler = styled.div`
  ${BackgroundLayer};
  position: absolute;
  z-index: 1;
  overflow-x: hidden;
  overflow-y: scroll;
  will-change: scroll-position;
`;
