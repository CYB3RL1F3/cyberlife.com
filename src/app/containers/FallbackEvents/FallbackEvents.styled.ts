import styled, { css } from 'app/theme';
import { Link as BaseLink } from 'app/components/atoms/Link';
import {
  TextStyle,
  AlphaTransitionDelay
} from 'app/components/SharedStyled';

import { Spinner } from 'app/components/atoms/Loading/Loading.styled';

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
  margin-left: 1rem;
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
  margin: 0 1rem;
  height: 3rem;
  border-bottom: solid 1px;
  ${({ theme }) => theme.media.mobile`
    height: 5rem;
  `};
`;

export const Link = styled(BaseLink)`
  ${PleaseContactStyle};
  text-decoration: underline;
`;

export const SeePastLink = styled.h3`
  ${PleaseContactStyle};
  ${AlphaTransitionDelay(4)}
  margin: 2rem 1rem 0 1rem;
  font-size: ${({ theme }) => theme.fontSizes.average};
  line-height: 2rem;
`;

export const Title = styled.h3`
  ${TextStyle}
  font-weight: normal;
  text-transform: uppercase;
  font-size: ${({ theme }) => theme.fontSizes.big};
`;

export const LoadingSpinner = styled(Spinner)`
  width: 1rem;
  height: 1rem;
  margin: 0;
  position: absolute;
  left: 1rem;
  top: 1px;
`;

export const SpinnerHandler = styled.span`
  height: 1rem;
  width: 1rem;
  position: relative;
`;
