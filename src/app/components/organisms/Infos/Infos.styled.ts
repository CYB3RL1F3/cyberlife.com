import styled, { keyframes } from 'app/theme';
import {
  TextStyle,
  AlphaTransitionDelay
} from 'app/components/atoms/SharedStyled';

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
  ${TextStyle};
  text-decoration: underline;
`;
