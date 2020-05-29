import styled, { css } from 'app/theme';
import { MouseEvent } from "react";

const borderColor = (alpha) => `rgba(222, 222, 222, ${alpha});`;

export interface PlayBtnProps {
  backgroundImage?: string;
  playing: boolean;
  onClick: (e: MouseEvent<HTMLDivElement>) => void;
  mini?: boolean;
  hasBackground?: boolean;
}

export const Container = styled.div<PlayBtnProps>`
  ${({ theme, backgroundImage }) => typeof backgroundImage === "string" ? `
    display: flex;
    width: 10rem;
    height: 10rem;
    background-size: cover;
    background-image: url(${backgroundImage});
    ${theme.media.mobile`
      width: 6rem;
      height: 6rem;
    `}
  ` : `
    display: flex;
    background-color: ${theme.player.backgroundColorMini};
    &:hover {
      cursor: pointer;
      background-color: rgba(255, 255, 255, 0.1);
      ${theme.media.mobile`
        background-color: ${theme.player.backgroundColorMini};
      `}
    }
    width: 10vh;
    height: 10vh;
    justify-content: center;
    align-items: center;
  `}
`;

interface HasBackground {
  hasBackground: boolean;
}

export const Cover = styled.div<HasBackground>`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ hasBackground }) => hasBackground ? 'none' : 'rgba(0, 0, 0, 0.2)'};
  &:hover {
    background-color: ${({ hasBackground }) => hasBackground ? 'none' : 'rgba(0, 0, 0, 0.4)'};
    cursor: pointer;
  }
`;

export const IconPlay = styled.div<PlayBtnProps>`
  border-style: solid;
  border-color: ${borderColor(0.8)};
  transition: all 0.25s;
  border-width: 0;
  ${({ playing }) =>
    playing
      ? css`
          width: 6px;
          height: 22px;
          border-left-width: ${({ mini  }) => mini ? 4 : 5}px;
          border-right-color: ${borderColor(0.8)};
          border-top-color: transparent;
          border-bottom-color: transparent;
          border-right-width: ${({ mini  }) => mini ? 4 : 5}px;
          border-top-width: 0;
          border-bottom-width: 0;
          margin-left: 0;
        `
      : css`
          width: 0;
          height: 0;
          border-left-width: 22px;
          border-right-color: ${borderColor(0)};
          border-top-color: transparent;
          border-bottom-color: transparent;
          border-right-width: 12px;
          border-top-width: ${({ mini }) => mini ? 12 : 14}px;
          border-bottom-width: ${({ mini }) => mini ? 12 : 14}px;
          margin-left: ${({ mini }) => mini ? 16 : 22}px
        `}
`;
