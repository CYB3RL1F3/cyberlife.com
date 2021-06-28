import styled, { keyframes } from 'app/theme';
import {
  TextStyle,
  AlphaTransitionDelay
} from 'app/components/SharedStyled';

export const InfosBox = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-start;
  margin: 1rem;
  ${({ theme }) => theme.media.mobile`
    max-height: 1rem;
    flex: 0;
    margin: 0;
  `}
`;

const bioAnim = keyframes`
  from {
    height: 0;
  }
  to {
    height: calc(100% - 1px);
  }
`;

const linkAnim = keyframes`
  0% {
    transform: scale(0) translateX(5px);
  }
  75% {
    transform: scale(0) translateX(5px);
  }
  96% {
    transform: scale(1.2) translateX(5px);
  }
  100% {
    transform: scale(1) translateX(0);
  }
`;

export const InfosContainer = styled.article`
  mask-type: luminance;
  overflow: hidden;
  width: 46vw;
  height: calc(100% - 1px);
  ${({ theme }) => theme.media.tablet`
    width: 100vw;
    height: calc(100% - 1px);
    ${AlphaTransitionDelay(50)}
  `}
  height: 0;
  animation: ${bioAnim} 0.25s ease-in-out forwards;
  animation-delay: 1.5s;
`;

export const Paragraph = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.average};
  ${TextStyle};
`;

export const A = styled.a`
  font-size: inherit;
  display: inline-block;
  width: 3rem;
  height: 2rem;
  ${TextStyle};
  text-decoration: underline;
  animation: ${linkAnim} 2.5s linear 0s 1 normal forwards;
  transition: all 0.3s linear !important;
  filter: brightness(1);
  &:hover {
    transform: scale(1.25) translateX(5px) !important;
    transition: all 0.3s linear !important;
    filter: brightness(1.5);
  }
`;
