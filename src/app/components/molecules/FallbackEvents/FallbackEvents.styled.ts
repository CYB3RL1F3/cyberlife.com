import styled, { css } from 'app/theme';
import { TextStyle } from 'app/components/atoms/SharedStyled';
import { Link as BaseLink } from 'app/components/atoms';
import { AlphaTransitionDelay } from 'app/components/atoms/SharedStyled/SharedStyled';

export const Container = styled.div`
  margin: 1rem;
  flex: 1;
`;

export const NoGigsHandler = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  ${AlphaTransitionDelay(1)};
  margin-bottom: 2rem;
`;

export const NoGigsText = styled.h3`
  ${TextStyle};
  font-size: 23pt;
  flex: 0.7;
  font-weight: normal;
  ${AlphaTransitionDelay(2)};
`;

export const NoGigsSmiley = styled.p`
  ${TextStyle};
  font-size: 50pt;
  flex: 0.3;
`;

export const PleaseContactStyle = css`
  ${TextStyle};
  font-size: 14pt;
`;

export const PleaseContact = styled.p`
  ${PleaseContactStyle};
  ${AlphaTransitionDelay(3)}
`;

export const Link = styled(BaseLink)`
  ${PleaseContactStyle};
  text-decoration: underline;
`;

export const A = styled.a`
  ${PleaseContactStyle};
`;

export const Title = styled.h3`
  ${TextStyle}
  font-weight: normal;
  text-transform: uppercase;
  font-size: 12pt;
`;
