import styled from 'app/theme';
import { AlphaTransitionDelay } from 'app/components/atoms/SharedStyled';

export const Container = styled.p`
  width: 10rem;
  line-height: ${({ theme }) => (theme.isFirefox ? '7vh' : '4.5vh')};
  display: inline-flex;
  max-height: 2.5rem;
  overflow: hidden;
  justify-content: space-between;
  ${AlphaTransitionDelay(60)};
  ${({ theme }) => theme.media.desktop`
    padding-top: 0.3rem;
  `}
`;

export const InputHandler = styled.span`
  width: 8rem;
  height: 4.5vh;
  ${({ theme }) => theme.media.tablet`
      height: 3.5rem;
      line-height: 3.5rem;
    `}
`;

export const IconHandler = styled.label`
  width: 2rem;
  line-height: ${({ theme }) => (theme.isFirefox ? '5.5vh' : '4vh')};
  ${({ theme }) => theme.media.tablet`
    line-height: 4rem;
    padding-top: 0;
  `}
  overflow: hidden;
  padding-top: 0.8vh;
  cursor: pointer;
`;

export const Icon = styled.img`
  width: 15px;
  height: auto;
  padding-left: 5px;
  filter: brightness(80%);
  opacity: 0.5;
  ${({ theme }) => theme.media.desktop`
    &:hover {
      opacity: 1;
    }
  `};
`;
