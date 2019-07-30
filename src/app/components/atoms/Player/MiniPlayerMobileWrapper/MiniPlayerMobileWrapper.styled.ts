import styled from 'app/theme';

export interface Active {
  active: boolean;
}

export const Container = styled.div<Active>`
  position: fixed;
  left: 0;
  bottom: ${({ active }) => (active ? '0' : '-20vh')};
  @supports (-webkit-appearance: none) {
    bottom: ${({ active }) => (active ? '56px' : '-20vh')};
  }
  width: 100vw;
  height: 9.5vh;
  z-index: 800;
  transition: all 0.5s;
`;

export const Handler = styled.div<Active>`
  position: relative;
  display: ${({ active }) => (active ? 'flex' : 'none')};
  flex: ${({ active }) => (active ? '6vh' : 0)};
  transition: all 0.5s;
`;
