import styled, { css } from 'app/theme';
import {
  TextStyle,
  AlphaTransitionDelay
} from 'app/components/atoms/SharedStyled';

const style = css`
  ${TextStyle};
  font-size: ${({ theme }) => theme.fontSizes.average};
`;

export const Paragraph = styled.p`
  ${style};
`;

export const Link = styled.a`
  ${style};
`;

export const Container = styled.div`
  ${({ index }) => AlphaTransitionDelay(index)}
  display: flex;
  flex-direction: column;
  margin: 0.5rem 1rem;
`;
