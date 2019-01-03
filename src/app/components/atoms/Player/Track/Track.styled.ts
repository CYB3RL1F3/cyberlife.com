import styled, { css } from 'app/theme';

export interface Background {
  backgroundImage: string;
}

export interface Trackline {
  opacity: string;
  progression: number;
}

export interface MiniContext {
  isMini: boolean;
}

const height = 5;

export const Waveform = styled.div<Background & MiniContext>`
  position: absolute;
  top: 2.5vh;
  left: 0;
  width: calc(100% + 1px);
  height: ${height}vh;
  mask-size: 100% ${height}vh;
  background-color: ${({ theme, isMini }) =>
    isMini ? theme.player.backgroundColorMini : theme.player.backgroundColor};
  mask-image: url(${({ backgroundImage }) => backgroundImage});
  opacity: 1;
  transition: all 0.25s;
`;

export const Container = styled.div<MiniContext>`
  width: 95%;
  height: 10vh;
  background-color: ${({ theme, isMini }) =>
    isMini ? theme.player.backgroundColorMini : theme.player.backgroundColor};
  overflow: hidden;
  position: relative;
  margin: auto 0;
`;

export const Content = styled.div<Trackline>`
  width: ${({ progression }) => `${progression}`}%;
  height: ${height - 0.2}vh;
  top: 2.6vh;
  background-color: white;
  opacity: ${({ opacity }) => opacity};
  overflow: hidden;
  position: absolute;
  margin: auto 0;
  transition: all 0.25s;
`;
