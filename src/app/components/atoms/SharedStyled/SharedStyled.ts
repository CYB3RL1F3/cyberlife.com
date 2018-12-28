import { css, keyframes } from 'app/theme';

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
  animation: ${alphaTransition} 0.15s linear forwards;
  animation-delay: ${index * 0.025}s;
`;

export const downTransition = keyframes`
  from {
    margin-top: -5rem;
    opacity: 0;
  }
  to {
    opacity: 1;
    margin-top: 0;
  }
`;

export const DownTransitionDelay = (delay: number) => css`
  opacity: 0;
  margin-top: -5rem;
  animation: ${downTransition} 0.3s ease-out forwards;
  animation-delay: ${delay}s;
`;
