import styled, { css } from 'app/theme';
import {
  TextStyle,
  AlphaTransitionDelay,
  Positionnable
} from 'app/components/SharedStyled';
import { Spinner } from 'app/components/atoms/Loading/Loading.styled';
import { Field } from 'formik';

export const Form = styled.form`
  flex: 1;
  display: flex;
  margin: 2rem;
  ${({ theme }) => theme.media.mobile`
    margin: 1rem;
  `}
  flex-direction: column;
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    transition: background-color 500000s ease-in-out 0s;
    transition-delay: 500000000s;
    -webkit-text-fill-color: white !important;
  }
`;

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

export const Textarea = styled<InputProps, {}>(Field)`
  ${({ index }) => inputStyle(index)};
  height: 10rem;
  min-height: 3rem;
  ${({ theme }) => theme.media.mobile`
    height: 14rem;
  `}
  resize: vertical;
  padding: 0.5rem 1rem;
  max-height: 50vh;
  background: ${({ haserror, theme }) =>
    haserror === 'true' ? theme.errors.background : theme.background.dark};
`;

export const SubmitWrapper = styled.p`
  display: flex;
  justify-content: flex-end;
  flex: 0.4;
  height: 4rem;
  margin: 0;
  ${({ theme }) => theme.media.mobile`
    flex: 1;
    height: 4rem;
  `}
`;

export const Bottom = styled.div<Positionnable>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  ${({ index }) => AlphaTransitionDelay(index)}
  ${({ theme }) => theme.media.mobile`
    flex-direction: column-reverse;
  `}
`;

export const Submit = styled.button`
  flex: 1;
  background: ${({ theme }) => theme.background.dark};
  ${inputStyle};
  color: ${({ theme }) => theme.color};
  padding: 0;
  line-height: 2.5rem;
  text-transform: uppercase;
  font-weight: normal;
  cursor: pointer;
  position: relative;
  ${({ theme }) => theme.media.mobile`
    line-height: 2rem;
    padding-left: 0;
  `}
`;

export const Loading = styled(Spinner)`
  width: 1rem;
  height: 1rem;
  position: absolute;
  bottom: 0.6rem;
  right: calc(50% - 0.5rem);
`;

export const ErrorField = styled.p`
  ${TextStyle};
  font-style: normal;
  line-height: 1rem;
  font-size: ${({ theme }) => theme.fontSizes.average};
  flex: 0.6;
  padding-top: 0.25rem;
  color: ${({ theme }) => theme.errors.text};
  ${({ theme }) => theme.media.mobile`
    flex: 1;
    font-size: 14pt;
    min-height: 2rem;
    line-height: 16pt;
  `}
`;

export const Verificator = styled.span`
  color: ${({ theme }) => theme.color};
  white-space: pre-line;
`;

export const CaptchaHandler = styled.div`
  width: 100%;
  height: 0;
`;
