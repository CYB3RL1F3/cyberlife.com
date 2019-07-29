import styled, { css, keyframes } from 'app/theme';
import { range, getHue, getNbSeconds } from 'app/utils/hue';

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
  overflow: hidden;
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
  /* disabled for performance issue
  filter: hue-rotate(${getHue()});
  animation: ${animatingBg} 86400s linear infinite;
  animation-delay: ${-getNbSeconds()}s;
  */
`;

export const Bg = styled.div`
  ${BackgroundLayer};
  opacity: 0.5;
  /* disabled for performance issue
  filter: brightness(0.7);
  */
`;

export const ChildrenHandler = styled.div`
  ${BackgroundLayer};
  position: absolute;
  z-index: 1;
  overflow-x: hidden;
  overflow-y: scroll;
  will-change: scroll-position;
`;
