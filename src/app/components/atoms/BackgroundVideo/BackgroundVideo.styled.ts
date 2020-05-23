import styled from 'app/theme';
export const Video = styled.video`
  width: auto;
  min-height: 100vh;
  min-width: 100vw;
  height: auto;
`;

export const VideoHandler = styled.div`
  width: 100vw;
  height: 100vh;
  ${({ opacity }) => `
    opacity: ${opacity}
  `}
  transition: opacity 0.5s linear forwards;
`;
