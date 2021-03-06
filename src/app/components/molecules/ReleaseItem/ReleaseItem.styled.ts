import styled, { css } from 'app/theme';
import GracefulImage from 'react-graceful-image';
import { TextStyle } from 'app/components/SharedStyled';
import { AlphaTransitionDelay } from 'app/components/SharedStyled/SharedStyled';
import { Link as BaseLink } from 'app/components/atoms/Link';

export const Container = styled.div`
  ${({ index }) => AlphaTransitionDelay(index)}
  display: flex;
  flex-direction: row;
  min-height: 11rem;
  margin: 1rem 0 0 1rem;
  border-bottom: solid 1px rgba(255, 255, 255, 0.1);

  ${({ theme }) => theme.media.mobile`
    margin: ${({ index }) => (index === 0 ? '0' : '1rem')} 0 0 0;
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
  font-size: ${({ theme }) => theme.fontSizes.average};
  ${({ theme }) => theme.media.mobile`
    font-size: ${({ theme }) => theme.fontSizes.big};
  `}
`;

export const P = styled.p`
  ${style};
`;

export const A = styled(BaseLink)`
  ${style};
`;

export const Title = styled.h3`
  ${style};
  text-transform: uppercase;
  font-weight: normal;
`;

export const TitleLink = styled(A)`
  text-transform: uppercase;
  font-weight: normal;
`;
