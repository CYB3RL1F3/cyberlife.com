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
  ${({ theme }) => theme.media.tablet`
    width: 100vw;
    height: calc(100% - 1px);
    ${AlphaTransitionDelay(50)}
  `}
  height: 0;
  animation: ${bioAnim} 0.5s ease-in-out forwards;
  animation-delay: 1.5s;
`;

export const Paragraph = styled.p`
  font-size: 8pt;
  ${TextStyle};
`;

export const A = styled.a`
  font-size: 8pt;
  ${TextStyle};
  text-decoration: underline;
`;
