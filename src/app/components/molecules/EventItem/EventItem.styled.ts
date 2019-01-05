import styled, { css } from 'app/theme';
import { TextStyle } from 'app/components/atoms/SharedStyled';
import { Link as BaseLink } from 'app/components/atoms';
import { AlphaTransitionDelay } from '../../atoms/SharedStyled/SharedStyled';

const style = css`
  ${TextStyle};
  font-size: 10pt;
  ${({ theme }) => theme.media.mobile`
    font-size: 14pt;
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
