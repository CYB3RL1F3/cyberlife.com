import styled from 'app/theme';

export interface Active {
  active: boolean;
}

export const Container = styled.div<Active>`
  width: 100vw;
  height: 9.5vh;
  z-index: 800;
  transition: all 0.5s;
  transform: translateY(${({ active }) => (active ? 0 : '11vh')});
`;

export const Handler = styled.div<Active>`
  display: ${({ active }) => (active ? 'flex' : 'none')};
  flex: ${({ active }) => (active ? '10vh' : 0)};
  transition: flex 0.5s;
`;
