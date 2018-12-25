import styled from 'app/theme';

export const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: ${({ theme }) =>
    `linear-gradient(to right, ${theme.background.fromColor}, ${
      theme.background.toColor
    });`};
  margin: 0;
  padding: 0;
`;
