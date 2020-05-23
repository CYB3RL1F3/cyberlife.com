import styled, { css } from 'app/theme';
import { TextStyle } from 'app/components/atoms/SharedStyled';
import { Link } from 'app/components/atoms/Link';

export const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin: 2rem;
  ${({ theme }) => theme.media.mobile`
    margin: 0rem;
    width: 100vw;
    box-sizing: border-box;
    padding: 1rem;
  `}
`;

export const InfoStyle = css`
  ${TextStyle}
  font-size: ${({ theme }) => theme.fontSizes.average};
  ${({ theme }) => theme.media.mobile`
    font-size: ${({ theme }) => theme.fontSizes.big};
  `}
  line-height: ${({ theme }) => theme.fontSizes.big};
`;

export const Content = styled.div`
  flex: 0.9;
  display: flex;
  flex-direction: row;
  ${({ theme }) => theme.media.mobile`
    flex-direction: column-reverse;
    flex: 1;
  `}
`;

export const ContentHandler = styled.div`
  flex: 0.6;
  display: flex;
  ${({ theme }) => theme.media.mobile`
    flex: unset;
  `}
  flex-direction: column;
  margin-top: 0.5rem;
`;

export const MapboxHandler = styled.div`
  flex: 0.4;
  ${({ theme }) => theme.media.mobile`
    flex: unset;
    .mapboxgl-map {
      margin: 0;
      position: relative;
    }
  `}
  margin: 1rem 0;
  .mapboxgl-map {
    box-shadow: 2px 2px rgba(0, 0, 0, 0.1), 0 0 2px rgba(0, 0, 0, 0.2);
  }
`;

export const TitleHandler = styled.div`
  flex: 0.075;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Title = styled.h3`
  ${TextStyle};
  font-size: ${({ theme }) => theme.fontSizes.big};
  line-height: 16pt;
  text-decoration: underline;
`;

export const Info = styled.p`
  ${InfoStyle}
  width: 95%;
`;

export const Lineup = styled.ul`
  padding: 0.5rem 0;
`;

export const LineupLine = styled.li`
  list-style: none;
  ${TextStyle};
  font-size: ${({ theme }) => theme.fontSizes.average};
  ${({ theme }) => theme.media.mobile`
    font-size: ${({ theme }) => theme.fontSizes.big};
  `}
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  margin: 0.5rem 0;
`;

export const H3 = styled.h3`
  ${TextStyle};
  font-size: ${({ theme }) => theme.fontSizes.average};
  font-weight: normal;
  line-height: 14pt;
  text-decoration: underline;
  ${({ theme }) => theme.media.mobile`
    font-size: ${({ theme }) => theme.fontSizes.big};
  `}
`;

export const GoBack = styled(Link)`
  ${TextStyle};
  flex: 0.3;
  text-align: right;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: ${({ theme }) => theme.fontSizes.big};
  text-decoration: underline;
  min-width: 4rem;
`;

export const InfoLink = styled.a`
  ${InfoStyle}
  text-decoration: underline;
`;

export const Flyer = styled.img`
  width: 90%;
  ${({ theme }) => theme.media.mobile`
    width: 80vw;
  `}
`;
