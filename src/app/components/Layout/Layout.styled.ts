import styled, { keyframes } from 'app/theme';
import { range } from 'app/utils/hue';
import { BackgroundLayer } from 'app/components/SharedStyled';

export const animatingBg = keyframes`
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
  ${({ theme }) => theme.media.mobile`
    height: 100%;
    position: relative;
  `}
  z-index: 1;
  overflow-x: hidden;
  overflow-y: overlay;
  will-change: scroll-position;
`;
