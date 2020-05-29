import styled, { css } from 'app/theme';
import {
  TextStyle,
  AlphaTransitionDelay
} from 'app/components/SharedStyled';
import { Link as BaseLink } from 'app/components/atoms/Link';

const style = css`
  ${TextStyle};
  font-size: ${({ theme }) => theme.fontSizes.average};
  ${({ theme }) => theme.media.mobile`
    font-size: ${({ theme }) => theme.fontSizes.big};
  `}
`;

export const Paragraph = styled.p`
  ${style};
`;

export const Link = styled(BaseLink)`
  ${style};
  text-decoration: underline;
`;

export const EventLink = styled(Link)`
  ${style};
  text-decoration: none;
`;

export const Container = styled.div`
  ${({ index }) => AlphaTransitionDelay(index)}
  display: flex;
  flex-direction: column;
  margin: 1rem;
`;
