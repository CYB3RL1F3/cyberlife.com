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
  height: 85vh;
  padding: 1rem 0;
`;

export const Content = styled.div`
  width: 0;
  animation: ${welcome} 0.75s ease-in-out forwards;
  animation-delay: 0.25s;
  height: 85vh;
  overflow-x: hidden;
  overflow-y: overlay;
  background: rgba(0, 0, 0, 0.4);
  color: white;
  display: flex;
  flex-direction: row;
  ::-webkit-scrollbar * {
    background: transparent;
  }
  ::-webkit-scrollbar {
    width: 0.4rem;
  }
  ::-webkit-scrollbar-corner {
    background: transparent;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: transparent;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: rgba(16, 27, 28, 0.7);
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #101b1c;
    cursor: pointer;
  }
`;

export const Handler = styled.div`
  flex: 1;
  opacity: 0;
  animation: ${appear} 0.5s linear forwards;
  animation-delay: 1s;
  display: flex;
  margin-right: -1rem;
`;
