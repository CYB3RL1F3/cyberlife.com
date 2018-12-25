import styled, { keyframes } from 'app/theme';

const welcome = keyframes`
  from {
    width: 0vw;
  }
  to {
    width: 50vw;
  }
`;

const appear = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 100vw;
  height: 80vh;
  padding: 1rem 0;
`;

export const Content = styled.div`
  animation: ${welcome} 0.75s ease-in-out forwards;
  animation-delay: 0.25s;
  height: 70vh;
  overflow: scroll;
  background: rgba(0, 0, 0, 0.4);
  color: white;
  display: flex;
  flex-direction: row;
`;

export const Handler = styled.div`
  flex: 1;
  opacity: 0;
  animation: ${appear} 0.5s linear forwards;
  animation-delay: 1s;
`;
