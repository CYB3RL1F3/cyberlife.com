import styled from 'app/theme';
import { PlayBtnProps } from '../PlayBtn';

type Opaque = {
  opacity: number;
};

const borderColor = (alpha) => `rgba(222, 222, 222, ${alpha});`;

export const Container = styled.div<Opaque>`
  flex: 1;
  max-height: 5vh;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  opacity: ${({ opacity }) => opacity};
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
  background-color: rgba(0, 0, 0, 0.4);
  &:hover {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.6);
  }
  width: 5vh;
  height: 5vh;
  justify-content: center;
  align-items: center;
`;

export const IconPlay = styled.div<PlayBtnProps>`
  border-style: solid;
  border-color: ${borderColor(0.8)};
  transition: all 0.25s;
  border-width: 0;
  ${({ playing }) =>
    playing
      ? `
    width: 3px;
    height: 11px;
    border-left-width: 2px;
    border-right-color: ${borderColor(0.8)};
    border-top-color: transparent;
    border-bottom-color: transparent;
    border-right-width: 2px;
    border-top-width: 0;
    border-bottom-width: 0;
    margin-left: 0;
  `
      : `
    width: 0;
    height: 0;
    border-left-width: 8px;
    border-right-color: ${borderColor(0)};
    border-top-color: transparent;
    border-bottom-color: transparent;
    border-right-width: 6px;
    border-top-width: 6px;
    border-bottom-width: 6px;
    margin-left: 8px;
  `}
`;
