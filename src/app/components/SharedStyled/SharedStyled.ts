import styled, { css, keyframes } from 'app/theme';
import { isFirefox } from 'app/utils/browsers';

export const HeaderTextStyle = css`
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: 16pt;
  text-transform: uppercase;
  color: ${({ theme }) => theme.color};
`;

export const TextStyle = css`
  font-style: italic;
  color: ${({ theme }) => theme.color};
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fontSizes.average};
`;

export interface Positionnable {
  index: number;
}

export const alphaTransition = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const AlphaTransitionDelay = (index: number) => css`
  opacity: 0;
  animation: ${alphaTransition} 0.25s linear forwards;
  animation-delay: ${index * 0.03}s;
`;

export const downTransition = keyframes`
  from {
    transform: translateY(-3rem);
    opacity: 0;
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const DownTransitionDelay = (delay: number) => css`
  opacity: 0;
  margin-top: 0;
  transform: translateY(-3rem);
  animation: ${downTransition} 0.3s ease-out forwards;
  animation-delay: ${delay}s;
  transform: translateZ(0);
`;

export const BackgroundLayer = css`
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  position: absolute;
  z-index: 0;
  overflow: hidden;
  ${({ theme }) => theme.media.mobile`
    height: 100%;
  `};
`;


interface Blurrable {
  isBlurred: boolean;
  mounted: boolean;
}

export const Background = styled.div<Blurrable>`
  ${BackgroundLayer};
  background-image: ${({ theme }) =>
    `linear-gradient(to right, ${theme.background.fromColor}, ${
      theme.background.toColor
    });`};
  ${({ theme }) => theme.media.mobile`
    align-self: flex-start;
    flex: auto;
    height: unset;
    position: unset;
  `}
  transform: translateZ(0);
  ${({ isBlurred, mounted }) => mounted && !isFirefox() ? `
    transition: filter 0.25s;
    filter: blur(${isBlurred ? '3px' : '0'});
  ` : ''}
  ${({ isBlurred, mounted }) => mounted && isFirefox() ? `
    transition: background 0.25s;
    background: ${isBlurred ? 'rgba(122, 122, 144, 0.8)' : 'rgba(0, 0, 0, 0)'};
  ` : ''}
`;