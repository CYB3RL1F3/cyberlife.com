import styled from 'app/theme';
import { TextStyle } from 'app/components/atoms/SharedStyled';

export const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin: 2rem;
  ${({ theme }) => theme.media.mobile`
    margin: 1rem;
  `}
`;

export const Content = styled.div`
  flex: 0.9;
  display: flex;
  flex-direction: row;
  ${({ theme }) => theme.media.mobile`
    flex-direction: column-reverse;
    flex: auto;
  `}
`;

export const ContentHandler = styled.div`
  flex: 0.6;
  display: flex;
  flex-direction: column;
`;

export const MapboxHandler = styled.div`
  flex: 0.4;
  ${({ theme }) => theme.media.mobile`
    flex: 0;
    .mapboxgl-map {
      margin: 1rem 0;
    }
  `}
  margin: 1rem 0;
  .mapboxgl-map {
    box-shadow: 2px 2px rgba(0, 0, 0, 0.1), 0 0 2px rgba(0, 0, 0, 0.2);
  }
`;

export const TitleHandler = styled.div`
  flex: 0.1;
  display: flex;
  flex-direction: row;
`;

export const Title = styled.h3`
  ${TextStyle};
  font-size: 14pt;
  line-height: 16pt;
  text-decoration: underline;
`;

export const Info = styled.p`
  ${TextStyle}
  font-size: 10pt;
  width: 95%;
  ${({ theme }) => theme.media.mobile`
    font-size: 12pt;
  `}
  line-height: 12pt;
`;

export const Lineup = styled.ul`
  padding: 1rem 0;
`;

export const LineupLine = styled.li`
  list-style: none;
  ${TextStyle};
  font-size: 10pt;
  ${({ theme }) => theme.media.mobile`
    font-size: 12pt;
  `}
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
  ${({ theme }) => theme.media.mobile`
    margin: 0.5rem 0;
  `}
`;

export const H3 = styled.h3`
  ${TextStyle};
  font-size: 10pt;
  font-weight: normal;
  line-height: 14pt;
  padding-bottom: 0.1rem;
  text-decoration: underline;
  margin-bottom: 0.4rem;
  ${({ theme }) => theme.media.mobile`
    font-size: 12pt;
  `}
`;
