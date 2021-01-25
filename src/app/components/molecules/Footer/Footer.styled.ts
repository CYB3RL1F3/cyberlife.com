import styled, { css } from 'app/theme';
import {
  TextStyle,
  AlphaTransitionDelay
} from 'app/components/SharedStyled';
import { Link as BaseLink } from 'app/components/atoms/Link';

const height = '4vh';

export const Container = styled.footer`
  height: ${height};
  min-height: 1.5rem;
  max-height: 5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100vw;
  position: absolute;
  bottom: 0.5em;
  ${({ theme }) => theme.media.tablet`
    width: 100vw;
    height: 3.5rem;
    top: 100vh;
    position: sticky;
    bottom: unset;
  `}
  ${({ theme }) => theme.media.mobile`
    position: unset;
    bottom: unset;
    overflow: hidden;
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
