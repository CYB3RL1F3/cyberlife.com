import styled from 'app/theme';
import { PlayBtnProps } from './PlayBtn';

const borderColor = (alpha) => `rgba(222, 222, 222, ${alpha});`;

export const Container = styled.div<PlayBtnProps>`
  display: flex;
  min-width: 10rem;
  max-height: 10rem;
  background-size: cover;
  background-image: url(${({ backgroundImage }) => backgroundImage});
`;

export const Cover = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
  &:hover {
    background-color: rgba(0, 0, 0, 0.4);
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
      ? `
    width: 6px;
    height: 22px;
    border-left-width: 5px;
    border-right-color: ${borderColor(0.8)};
    border-top-color: transparent;
    border-bottom-color: transparent;
    border-right-width: 5px;
    border-top-width: 0;
    border-bottom-width: 0;
  `
      : `
    width: 0;
    height: 0;
    border-left-width: 14px;
    border-right-color: ${borderColor(0)};
    border-top-color: transparent;
    border-bottom-color: transparent;
    border-right-width: 12px;
    border-top-width: 14px;
    border-bottom-width: 14px;
  `}
`;

export type zo = PlayBtnProps;
