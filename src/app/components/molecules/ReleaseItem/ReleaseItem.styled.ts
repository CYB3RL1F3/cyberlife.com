import styled, { css } from 'app/theme';
import GracefulImage from 'react-graceful-image';
import { TextStyle } from 'app/components/atoms/SharedStyled';
import { AlphaTransitionDelay } from 'app/components/atoms/SharedStyled/SharedStyled';

export const Container = styled.div`
  ${({ index }) => AlphaTransitionDelay(index)}
  display: flex;
  flex-direction: row;
  min-height: 11rem;
  margin: 1rem 0 1rem 1rem;
  border-bottom: solid 1px rgba(255, 255, 255, 0.1);

  ${({ theme }) => theme.media.mobile`
    margin: 0;
  `}
`;

export const ThumbHandler = styled.p`
  display: flex;
  width: 12rem;
  ${({ theme }) => theme.media.mobile`
    width: 8rem;
    margin: 0 1rem 0 0;
  `}
`;

export const Image = styled(GracefulImage)`
  min-width: 10rem;
  max-height: 10rem;

  ${({ theme }) => theme.media.mobile`
    min-width: 6rem;
    max-height: 6rem;
  `}
`;

export const Tracklist = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
`;

export const InfosHandler = styled.div`
  flex: auto;
  display: flex;
  flex-direction: column;
`;

const style = css`
  ${TextStyle};
  font-size: 10pt;
  ${({ theme }) => theme.media.mobile`
    font-size: 12pt;
  `}
`;

export const P = styled.p`
  ${style};
`;

export const A = styled.a`
  ${style};
`;

export const Title = styled.h3`
  ${style};
  text-transform: uppercase;
  font-weight: normal;
`;
