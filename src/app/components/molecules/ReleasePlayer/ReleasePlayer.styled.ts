import styled from 'app/theme';
import { TextStyle } from 'app/components/SharedStyled';
import { Container as BaseContainer } from '../MiniPlayer/MiniPlayer.styled';
import { Track as BaseTrack } from 'app/components/atoms';

export const Handler = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 6rem;
`;

export const Title = styled.a`
  ${TextStyle}
  margin: 1rem 0;
`;

export const Container = styled(BaseContainer)`
  margin: 0 0 1rem 0;
  min-height: 4rem;
  ${({ theme }) => theme.media.mobile`
    min-height: 5rem;
  `}
`;

export const TrackHandler = styled.div`
  flex: 1;
`;

export const Track = styled(BaseTrack)`
  width: 100%;
`;
