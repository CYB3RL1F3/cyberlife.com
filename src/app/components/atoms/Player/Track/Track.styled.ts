import styled, { css } from 'app/theme';

export interface Background {
  backgroundImage: string;
  opacity: number;
  progression: number;
}

export const bg = (image, opacity) => css`
  background-image: url(${image});
  opacity: ${opacity};
`;

const width = 30;
const height = 5;

export const Waveform = styled.div<Background>`
  position: absolute;
  top: 0;
  left: 0;
  width: ${width}vw;
  height: ${height}vh;
  background-size: 100% ${height}vh;
  background-image: url(${({ backgroundImage }) => backgroundImage});
  opacity: ${({ opacity }) => opacity};
  clip: rect(
    0,
    ${({ progression }) => `${(progression / 100) * width}vw`},
    ${height}vh,
    0
  );
  transition: all 0.25s;
`;

export const Container = styled.div`
  width: ${width}vw;
  height: ${height}vh;
  overflow: hidden;
  position: relative;
  margin: auto 0;
  background-color: ${({ theme }) => theme.picturePlaceholder};
`;
