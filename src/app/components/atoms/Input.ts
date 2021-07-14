import styled, { css } from 'app/theme';
import { Field } from 'formik';
import {
  AlphaTransitionDelay,
  Positionnable,
  TextStyle,
} from '../SharedStyled';

const inputStyle = (index: number) => css`
  ${AlphaTransitionDelay(index)}
  transition: background 0.25s linear;
  border: none;
  outline: none;
  width: 100%;
  margin: 0.25rem 0;
  height: 2.5rem;
  min-height: 2.5rem;
  line-height: 2rem;
  padding-left: 1rem;
  ${TextStyle};
  font-size: ${({ theme }) => theme.fontSizes.big};
  color: white;
  box-sizing: border-box;
  ${({ theme }) => theme.media.mobile`
    margin: 0.25rem 0;
    height: 2.5rem;
    line-height: 2rem;
    padding-left: 1rem;
    font-size: ${({ theme }) => theme.fontSizes.big};
  `}
`;

export interface InputProps extends Positionnable {
  haserror: string;
}

export const Input = styled<InputProps, {}>(Field)`
  ${({ index }) => inputStyle(index)};
  background: ${({ haserror, theme }) =>
    haserror === 'true' ? theme.errors.background : theme.background.dark};
`;
