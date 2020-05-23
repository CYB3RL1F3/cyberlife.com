import styled from 'app/theme';

export const Container = styled.div`
  margin: 1.5rem 1rem;
  display: flex;
  flex-direction: column;
`;

export const Unavailable = styled.p`
  font-size: 15px;
  text-align: center;
  width: 100%;
  font-family: ${({ theme }) => theme.fonts.primary};
  color: ${({ theme }) => theme.color};
`;