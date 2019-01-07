import styled from 'app/theme';

export interface Active {
  active: boolean;
}

export const Container = styled.div<Active>`
  position: fixed;
  left: 0;
  bottom: ${({ active }) => (active ? '2vh' : '-10vh')};
  height: 10vh;
  width: 100vw;
  z-index: 800;
  transition: all 0.5s;
`;

export const Sustain = styled.div<Active>`
  width: 100vw;
  height: ${({ active }) => (active ? '9.5vh' : '0')};
`;
