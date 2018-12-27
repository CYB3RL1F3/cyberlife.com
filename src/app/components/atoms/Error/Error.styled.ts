import styled from 'app/theme';
import { TextStyle } from '../SharedStyled';

export const Container = styled.div`
  display: flex;
  margin: 1rem;
`;

export const ErrorTitle = styled.h3`
  ${TextStyle};
  font-size: 16pt;
  color: #991212;
  font-style: normal;
`;

export const ErrorMessage = styled.p`
  ${TextStyle};
  font-size: 12pt;
`;
