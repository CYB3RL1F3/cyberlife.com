import styled, { css } from 'app/theme';
import { TextStyle } from 'app/components/atoms/SharedStyled';
import { AlphaTransitionDelay } from 'app/components/atoms/SharedStyled/SharedStyled';

export const Container = styled.div`
  ${({ index }) => AlphaTransitionDelay(index)}
  display: flex;
  flex-direction: row;
  min-height: 10rem;
  margin: 1rem 0 1rem 1rem;
  border-bottom: solid 1px rgba(255, 255, 255, 0.1);
  padding-bottom: 1rem;
`;

export const ThumbHandler = styled.p`
  display: flex;
  width: 12rem;
`;

export const InfosHandler = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const style = css`
  ${TextStyle};
  font-size: 10pt;
`;

export const Handler = styled.div`
  max-height: 3rem;
`;

export const Description = styled.p`
  ${style};
  max-height: 3rem;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-top: 0.6rem;
  width: 95%;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
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
