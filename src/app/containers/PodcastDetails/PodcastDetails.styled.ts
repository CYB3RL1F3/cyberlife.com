import styled from 'app/theme';
import { TextStyle } from 'app/components/SharedStyled';
import { Link } from 'app/components/atoms/Link';

export const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin: 2rem;
  ${({ theme }) => theme.media.mobile`
    margin: 1rem;
  `}
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

export const GoBack = styled(Link)`
  ${TextStyle};
  flex: 0.3;
  text-align: right;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 13pt;
  text-decoration: underline;
  min-width: 4rem;
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
  ${({ theme }) => theme.media.mobile`
    margin: 0.5rem 0;
  `}
`;

export const DataContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 2rem 0 1rem 0;
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
`;

export const A = styled.a`
  ${TextStyle};
`;

export const Description = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 1rem 0;
`;

export const DescriptionHandler = styled.p`
  ${TextStyle};
  padding-bottom: 1rem;
  & a {
    ${TextStyle}
    text-decoration: underscore;
  }
`;

export interface Displayable {
  opacity: number;
}

export const TrackHandler = styled.div<Displayable>`
  display: flex;
  opacity: ${({ opacity }) => opacity};
  transition: opacity 0.5s;
`;

export const Tag = styled.a`
  display: inline-block;
  padding: 0.2rem 0.3rem;
  ${TextStyle}
  font-size: ${({ theme }) => theme.fontSizes.average};
  line-height: 1rem;
  background: rgba(122, 122, 122, 0.1);
  border-radius: 3px;
  text-decoration: none;
  margin: 0 0.5rem 0.5rem 0;
  &:hover {
    text-decoration: none;
  }
`;

export const TagList = styled(P)`
  margin: 1rem 0;
`;
