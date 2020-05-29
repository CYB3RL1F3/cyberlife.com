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
  ${({ theme }) => theme.media.mobile`
    margin: 0;
    flex-direction: column;
  `}
`;

export const PlayersHandler = styled.div`
  display: flex;
  flex-direction: column;
`;

export const PicHandler = styled.div`
  width: 10rem;
  height: 10rem;
  margin-right: 1rem;
  ${({ theme }) => theme.media.mobile`
    ${({ theme }) => theme.media.mobile`
    width: 90vw;
    height: 90vw;
    margin: 1rem 0 0 0;
  `}
  `}
`;

export const Image = styled.img`
  min-width: 10rem;
  max-height: 10rem;
  ${({ theme }) => theme.media.mobile`
    max-width: 100vw;
    min-height: 18rem;
    max-height: 90vw;
  `}
`;

export const ThumbHandler = styled.div`
  display: flex;
  width: 10rem;
  flex-direction: column;
  margin-right: 2rem;
  ${({ theme }) => theme.media.mobile`
    width: 96%;
    margin-right: 1rem;
    margin-bottom: 1rem;
  `}
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
`;

export const DescriptionHandler = styled.p`
  margin: 1rem 0;
  ${TextStyle};
  padding-bottom: 1rem;
`;

export const Tracklist = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 0 1rem 0;
`;
