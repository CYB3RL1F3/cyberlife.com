import styled from 'app/theme';
import { TextStyle } from 'app/components/SharedStyled';

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
  font-size: ${({ theme }) => theme.fontSizes.big};
`;

export const A = styled.a`
  ${TextStyle};
  font-size: ${({ theme }) => theme.fontSizes.big};
  text-decoration: underline;
  cursor: pointer;
`;
