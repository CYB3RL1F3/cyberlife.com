import styled from 'app/theme';

export interface Active {
  active: boolean;
}

export const Container = styled.div<Active>`
  width: inherit;
  height: 10vh;
  z-index: 800;
  transition: all 0.5s;
`;

export const Handler = styled.div<Active>`
  display: flex;
  flex: ${({ active }) => (active ? '10vh' : '0vh')};
  max-height: ${({ active }) => (active ? '10vh' : '0vh')};
  transition: all 0.25s;
  width: 100vw;
`;

export const Wrapper = styled.div`
  height: 10vh;
  width: inherit;
  overflow: hidden;
  position: relative;
`;
