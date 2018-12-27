import styled, { keyframes } from 'app/theme';

const rotation = keyframes`
  0% {
    transform: rotate(0deg);
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    transform: rotate(360deg);
    opacity: 1;
  }
}
`;

export const Spinner = styled.div`
  animation: ${rotation} 0.25s linear infinite;
  border: solid 2px;
  border-top-color: rgba(99, 99, 99, 0.5);
  border-left-color: rgba(122, 122, 122, 0.5);
  border-bottom-color: rgb(99, 99, 99, 0.5);
  border-right-color: rgb(77, 77, 77, 0.5);
  border-radius: 50%;
  width: 4rem;
  height: 4rem;
  margin: auto;
  padding: 0;
`;

export const Container = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
`;
