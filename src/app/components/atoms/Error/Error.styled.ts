import styled from 'app/theme';
import { TextStyle } from '../SharedStyled';

export const Container = styled.div`
  display: flex;
  margin: 1rem;
  flex-direction: column;
`;

export const ErrorTitle = styled.h3`
  ${TextStyle};
  font-size: 16pt;
  color: #991212;
  font-style: normal;
  margin-bottom: 1.5rem;
`;

export const ErrorMessage = styled.p`
  ${TextStyle};
  font-size: 12pt;
`;

export const A = styled.a`
  ${TextStyle};
  font-size: 12pt;
  text-decoration: underline;
  cursor: pointer;
`;
