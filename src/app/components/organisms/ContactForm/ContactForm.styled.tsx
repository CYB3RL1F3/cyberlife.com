import styled, { css } from 'app/theme';
import { TextStyle } from 'app/components/atoms/SharedStyled';
import { Spinner } from 'app/components/atoms/Loading/Loading.styled';
import { Field } from 'formik';

export const Form = styled.form`
  flex: 1;
  display: flex;
  margin: 2rem;
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

const inputStyle = css`
  transition: background 0.25s linear;
  border: none;
  outline: none;
  width: 100%;
  margin: 0.25rem 0;
  height: 2.5rem;
  line-height: 2rem;
  padding-left: 1rem;
  ${TextStyle};
  font-size: 12pt;
  color: white;
  box-sizing: border-box;
`;

export interface InputProps {
  hasError?: boolean;
}

export const Input = styled(Field)`
  ${inputStyle};
  background: ${({ hasError }) =>
    hasError ? 'rgba(244, 12, 26, 0.3)' : 'rgba(6, 11, 11, 0.57)'};
`;

export const Textarea = styled(Field)`
  ${inputStyle};
  height: 10rem;
  resize: vertical;
  background: ${({ hasError }) =>
    hasError ? 'rgba(244, 12, 26, 0.3)' : 'rgba(6, 11, 11, 0.57)'};
`;

export const SubmitWrapper = styled.p`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  height: 4rem;
  margin: 0;
`;

export const Submit = styled.button`
  flex: 0.4;
  background: rgba(6, 11, 11, 0.57);
  ${inputStyle};
  color: ${({ theme }) => theme.color};
  padding: 0;
  line-height: 2.5rem;
  text-transform: uppercase;
  font-weight: normal;
  cursor: pointer;
`;

export const Loading = styled(Spinner)`
  width: 0.5rem;
  height: 0.5rem;
`;