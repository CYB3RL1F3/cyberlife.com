import styled from 'app/theme';
export interface Opaque {
  opacity: number;
}

export const Container = styled.div<Opaque>`
  flex: 1;
  max-height: 5vh;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  opacity: ${({ opacity }) => opacity};

  ${({ theme }) => theme.media.tablet`
    max-height: ${({ opacity }) => (opacity ? '8vh' : '0')};
    margin: ${({ opacity }) => (opacity ? '1rem 0' : '0')};
    transition: max-height 0.25s;
  `}
  ${({ theme }) => theme.media.mobile`
    opacity: 1;
    max-height: 0;
    margin: 0;
  `}
  transition: opacity 0.5s;
  margin: 1.5rem 0;
`;

export const ButtonHandler = styled.div`
  flex: 0.1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10vh;
`;

export const TrackHandler = styled.div`
  flex: 0.8;
`;
