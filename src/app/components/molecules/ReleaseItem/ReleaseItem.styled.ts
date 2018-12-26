import styled, { css } from 'app/theme';
import GracefulImage from 'react-graceful-image';
import { TextStyle } from 'app/components/atoms/SharedStyled';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 20rem;
  margin: 1rem;
`;

export const ThumbHandler = styled.p`
  display: flex;
  margin: 1rem;
  width: 12rem;
`;

export const Image = styled(GracefulImage)`
  min-width: 10rem;
  max-height: 10rem;
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
`;
