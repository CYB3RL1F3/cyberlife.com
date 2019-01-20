import styled, { css } from 'app/theme';
import {
  TextStyle,
  AlphaTransitionDelay
} from 'app/components/atoms/SharedStyled';
import { Link as BaseLink } from 'app/components/atoms/Link';

const style = css`
  ${TextStyle};
  font-size: 10pt;
  ${({ theme }) => theme.media.mobile`
    font-size: 12pt;
  `}
`;

export const Paragraph = styled.p`
  ${style};
`;

export const Link = styled(BaseLink)`
  ${style};
`;

export const Container = styled.div`
  ${({ index }) => AlphaTransitionDelay(index)}
  display: flex;
  flex-direction: column;
  margin: 1rem;
`;
