import styled, { css } from 'app/theme';
import {
  TextStyle,
  AlphaTransitionDelay
} from 'app/components/atoms/SharedStyled';

const height = '4vh';

export const Container = styled.footer`
  height: ${height};
  min-height: 1.5rem;
  max-height: 5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  ${({ theme }) => theme.media.tablet`
    width: 100vw;
    height: ${height};
    min-height: 2.2rem;
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
    line-height: 2.4rem;
    @media (max-height: 720px) {
      line-height: 2.2rem;
    }
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
    line-height: 2rem;
  `}
`;

export const A = styled.a`
  ${FooterTxt};
`;

export const VolumeContainer = styled.div`
  flex: 0.1;
  padding-right: 1rem;
`;
