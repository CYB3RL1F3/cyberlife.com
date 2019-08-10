import styled, { css } from 'app/theme';
import {
  TextStyle,
  AlphaTransitionDelay
} from 'app/components/atoms/SharedStyled';
import { Link } from 'app/components/atoms/Link';

export const Container = styled.div`
  ${({ index }) => AlphaTransitionDelay(index)}
  display: flex;
  flex-direction: row;
  min-height: 10rem;
  margin: 1rem 0 0 1rem;
  border-bottom: solid 1px rgba(255, 255, 255, 0.1);
  padding-bottom: 1rem;
  ${({ theme }) => theme.media.mobile`
    min-height: 6rem;
    margin: 0 0 1rem 0;
  `}
`;

export const ThumbHandler = styled.div`
  display: flex;
  width: 10rem;
  flex-direction: column;
  margin-right: 2rem;
  ${({ theme }) => theme.media.mobile`
    width: 6rem;
    margin-right: 1rem;
  `}
`;

export const InfosHandler = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const style = css`
  ${TextStyle};
  font-size: ${({ theme }) => theme.fontSizes.average};
  ${({ theme }) => theme.media.mobile`
    font-size: 11pt;
  `}
`;

export const Handler = styled.div`
  flex: 1;
  display: flex;
`;

export const Description = styled.p`
  ${style};
  max-height: 3rem;
  overflow: hidden;
  padding-top: 0.6rem;
  word-break: break-word;
  text-overflow: ellipsis;
  width: 96%;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  ${({ theme }) => theme.media.mobile`
    font-size: ${({ theme }) => theme.fontSizes.average};
  `}
`;

export const A = styled.a`
  ${style};
`;

export const Title = styled.h3`
  ${style};
  text-transform: uppercase;
  font-weight: normal;
`;

export interface Displayable {
  opacity: number;
}

export const TrackHandler = styled.div<Displayable>`
  flex: 1;
  display: flex;
  opacity: ${({ opacity }) => opacity};
  transition: opacity 0.5s;
`;

export const PodcastLink = styled(Link)`
  ${style};
`;
