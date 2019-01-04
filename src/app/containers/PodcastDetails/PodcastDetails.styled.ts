import styled from 'app/theme';
import { TextStyle } from 'app/components/atoms/SharedStyled';

export const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin: 2rem;
`;

export const TitleHandler = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Title = styled.h3`
  ${TextStyle};
  font-size: 14pt;
  line-height: 16pt;
  text-transform: uppercase;
  font-weight: normal;
  flex: 0.7;
`;

export const Hashtag = styled.h4`
  ${TextStyle};
  flex: 0.3;
  text-align: right;
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
`;

export const DataContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 2rem 0 1rem 0;
  min-height: 10rem;
`;

export const PicHandler = styled.div`
  flex: 0.5;
`;

export const TextHandler = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const P = styled.p`
  ${TextStyle};
  font-size: 12pt;
`;

export const A = styled.a`
  ${TextStyle};
  font-size: 12pt;
`;

export const Description = styled.div`
  display: flex;
  flex: 0;
`;

export const DescriptionHandler = styled.div`
  margin: 1rem 0;
  ${TextStyle};
  font-size: 12pt;
  padding-bottom: 1rem;
`;

export interface Displayable {
  opacity: number;
}

export const TrackHandler = styled.div<Displayable>`
  display: flex;
  opacity: ${({ opacity }) => opacity};
  transition: opacity 0.5s;
`;

export const Tag = styled.span`
  display: inline-block;
  padding: 0.2rem 0.3rem;
  ${TextStyle}
  font-size: 10pt;
  line-height: 1rem;
  background: rgba(122, 122, 122, 0.1);
  border-radius: 3px;
  margin: 0 0.5rem 0.5rem 0;
`;

export const TagList = styled(P)`
  margin-top: 1rem;
`;
