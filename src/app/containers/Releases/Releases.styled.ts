import styled from 'app/theme';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem 0 0 1rem;
  ${({ theme }) => theme.media.mobile`
    margin: 1rem;
  `}
  flex: 1;
`;
