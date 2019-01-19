import styled, { css } from 'app/theme';

export const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
`;

export const PixelTrackersWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 0;
  opacity: 0.1;
`;

export const Console = styled.div`
  background: black;
  margin: 1rem;
  position: absolute;
  top: 0;
  left: 0;
  width: 99vw;
  height: 100vh;
  z-index: 1;
`;

const outputStyle = css`
  color: white;
  font-family: 'Courier New', Courier, monospace;
  font-size: 14px;
`;

export const Output = styled.p`
  ${outputStyle};
`;

export const A = styled.a`
  ${outputStyle};
`;

export const Li = styled.li`
  margin-left: 1rem;
  list-style: circle;
`;
