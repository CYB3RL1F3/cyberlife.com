import styled, { keyframes } from 'app/theme';

const welcome = keyframes`
  from {
    width: 0vw;
  }
  to {
    width: 50vw;
  }
`;

const welcomeTabs = keyframes`
  from {
    width: 0vw;
  }
  to {
    width: 100vw;
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
  `}
  width: 100vw;
  height: 85vh;
  padding: 0;
`;

export const AppContainer = styled.div`
  ${({ theme }) => theme.media.mobile`
    display: flex;
    flex-direction: column;
    height: 100vh;
    @supports (-webkit-appearance:none) {
      ${
        theme.isAndroid && !theme.isFirefox ? 'height: calc(100vh - 56px);' : ''
      }
    }
  `}
`;

export const Content = styled.div`
  width: 0;
  animation: ${welcome} 0.3s ease-in-out forwards;
  animation-delay: 1s;
  height: 85vh;
  overflow-y: overlay;
  will-change: scroll-position;
  overflow-x: hidden;
  background: rgba(0, 0, 0, 0.4);
  box-shadow: 2px 2px rgba(0, 0, 0, 0.1), 0 0 1px rgba(0, 0, 0, 0.2);
  color: white;
  display: flex;
  flex-direction: row;

  ${({ theme }) => theme.media.tablet`
    animation: ${welcomeTabs} 0.3s ease-in-out forwards;
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
  animation: ${appear} 0.25s linear forwards;
  animation-delay: 1.25s;
  display: flex;
`;
