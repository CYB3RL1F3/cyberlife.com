import styled, { keyframes } from 'app/theme';

const welcome = keyframes`
  from {
    transform: translateX(50vw);
  }
  to {
    transform: translateX(0vw);
  }
`;

const welcomeTabs = keyframes`
  from {
    transform: translateX(100vw);
  }
  to {
    transform: translateX(0vw);
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
  ${({ theme }) => theme.media.tablet`
    flex-direction: column;
    justify-content: flex-start;
    height: unset;
    min-height: calc(100vh - 6.6rem);
  `}
  ${({ theme }) => theme.media.mobile`
    min-height: calc(100vh - 7rem);
  `}
  width: 100vw;
  height: calc(100vh - 6.6rem);
  
  padding: 0;
`;

export const AppContainer = styled.div`
  ${({ theme }) => theme.media.mobile`
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: hidden;
    @supports (-webkit-appearance:none) {
      ${
        theme.isAndroid && !theme.isFirefox ? 'height: calc(100vh - 56px);' : ''
      }
      @media all and (display-mode: standalone) {
        height: 100vh;
      }
    }
  `}
`;

export const Content = styled.div`
  width: 50vw;
  transform: translateX(50vw);
  animation: ${welcome} 0.3s ease-in-out forwards;
  animation-delay: 1s;
  animation-iteration-count: 1;
  height: 85vh;
  position: relative;
  overflow-y: overlay;
  will-change: scroll-position;
  overflow-x: hidden;
  background: rgba(0, 0, 0, 0.4);
  box-shadow: 2px 2px rgba(0, 0, 0, 0.1), 0 0 1px rgba(0, 0, 0, 0.2);
  color: white;
  display: flex;
  flex-direction: row;
  &.loaded {
    animation: none;
    transform: translateX(0vw);
  }

  ${({ theme }) => theme.media.tablet`
    width: 100vw;
    transform: translateX(100vw);
    animation: ${welcomeTabs} 0.3s ease-in-out forwards;
    &.loaded {
      animation: none;
      transform: translateX(0vw);
    }
    min-height: 68vh;
    height: unset;
    overflow-y: visible;
  `}

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
    background: rgba(16, 27, 28, 0.2);
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: rgba(15, 24, 25, 0.9);
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
  animation: ${appear} 0.25s linear forwards;
  animation-delay: 1.25s;
  display: flex;
`;
