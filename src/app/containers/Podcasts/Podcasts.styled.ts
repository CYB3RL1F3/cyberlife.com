import styled from 'app/theme';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem 0 0 1rem;
  flex: 1;
`;

export const Unavailable = styled.p`
  font-size: 15px;
  text-align: center;
  width: 100%;
  font-family: ${({ theme }) => theme.fonts.primary};
  color: ${({ theme }) => theme.color};
`;