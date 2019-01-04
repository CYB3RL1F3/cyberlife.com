import styled from 'app/theme';
import { AlphaTransitionDelay } from 'app/components/atoms/SharedStyled';

export const Container = styled.p`
  width: 10rem;
  line-height: 4.5vh;
  display: inline-flex;
  justify-content: space-between;
  ${AlphaTransitionDelay(60)};
`;

export const InputHandler = styled.span`
  width: 8rem;
  height: 4.5vh;
`;

export const IconHandler = styled.a`
  width: 2rem;
  line-height: 4vh;
  overflow: hidden;
  padding-top: 0.8vh;
  cursor: pointer;
`;
