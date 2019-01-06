import styled from 'app/theme';
export interface PlayBtnProps {
  backgroundImage: string;
  playing: boolean;
  onClick: (e: React.MouseEvent) => void;
}

export interface Opaque {
  opacity: number;
}

const borderColor = (alpha) => `rgba(222, 222, 222, ${alpha});`;

export const Container = styled.div<Opaque>`
  flex: 1;
  max-height: 5vh;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  opacity: ${({ opacity }) => opacity};
  ${({ theme }) => theme.media.mobile`
    opacity: 1;
  `}
  transition: opacity 0.5s;
  margin: 1rem 0;
`;

export const ButtonHandler = styled.div`
  flex: 0.1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TrackHandler = styled.div`
  flex: 0.8;
`;

export const PlayBtn = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.player.backgroundColorMini};
  &:hover {
    cursor: pointer;
    background-color: rgba(255, 255, 255, 0.1);
    ${({ theme }) => theme.media.mobile`
      background-color: ${theme.player.backgroundColorMini};
    `}
  }
  width: 10vh;
  height: 10vh;
  justify-content: center;
  align-items: center;
  margin-top: 5vh;
`;

export const IconPlay = styled.div<PlayBtnProps>`
  border-style: solid;
  border-color: ${borderColor(0.8)};
  transition: all 0.25s;
  border-width: 0;
  ${({ playing }) =>
    playing
      ? `
    width: 6px;
    height: 22px;
    border-left-width: 4px;
    border-right-color: ${borderColor(0.8)};
    border-top-color: transparent;
    border-bottom-color: transparent;
    border-right-width: 4px;
    border-top-width: 0;
    border-bottom-width: 0;
    margin-left: 0;
  `
      : `
    width: 0;
    height: 0;
    border-left-width: 16px;
    border-right-color: ${borderColor(0)};
    border-top-color: transparent;
    border-bottom-color: transparent;
    border-right-width: 12px;
    border-top-width: 12px;
    border-bottom-width: 12px;
    margin-left: 16px;
  `}
`;
