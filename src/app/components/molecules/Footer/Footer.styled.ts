import styled, { css } from 'app/theme';
import {
  TextStyle,
  AlphaTransitionDelay
} from 'app/components/SharedStyled';
import { Link as BaseLink } from 'app/components/atoms/Link';

const height = '1.5rem';

export const Container = styled.footer`
  height: 1em;
  min-height: 1.5rem;
  max-height: 5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100vw;
  ${({ theme }) => theme.media.tablet`
    top: calc(100vh - 3rem);
    position: sticky;
    bottom: unset;
  `}
  ${({ theme }) => theme.media.mobile`
    position: unset;
    min-height: 3rem;
  `}
`;

export const FooterTxt = css`
  ${TextStyle};
  font-size: 8pt;
  font-style: normal;
  line-height: ${height};
  ${AlphaTransitionDelay(50)}
  min-height: 2.2rem;
  ${({ theme }) => theme.media.tablet`
    height: 3.5rem;
    line-height: 3.9rem;
  `}
`;

export const Text = styled.p`
  ${FooterTxt};
  margin: 0 auto;
  padding: 0 1rem;
  box-sizing: border-box;
  flex: 0.9;
  line-height: 2.5rem;
  
  ${({ theme }) => theme.media.tablet`
    line-height: 3rem;
  `}
  ${({ theme }) => theme.media.desktop`
    margin-top: 0.4rem;
  `}
  @media(max-width: 285px) {
    display: none;
  }
`;

export const Link = styled(BaseLink)`
  ${FooterTxt};
  text-decoration: underline;
`;

export const A = styled.a`
  ${FooterTxt};
`;

export const VolumeContainer = styled.div`
  flex: 0.1;
  padding-right: 1rem;
`;
