import styled, { keyframes } from 'app/theme';
import { TextStyle } from 'app/components/SharedStyled';

const linkAnim = keyframes`
  0% {
    transform: scale(0);
  }
  75% {
    transform: scale(0);
  }
  96% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
`;

export const A = styled.a`
  font-size: inherit;
  display: inline-block;
  width: 3rem;
  height: 2rem;
  ${TextStyle};
  text-decoration: underline;
  transition: all 0.3s linear !important;
  filter: brightness(1);
  ${({ theme }) => theme.media.desktop`
    animation: ${linkAnim} 2.5s linear 0s 1 normal forwards;
    &:hover {
      transform: scale(1.25) !important;
      transition: all 0.3s linear !important;
      filter: brightness(1.5);
    }
  `}
`;
