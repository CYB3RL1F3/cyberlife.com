import styled from "app/theme";
import { ModalStyle } from "app/contexts/ModalContext";

export interface ModalWrapperProps {
  opened: boolean;
}
export interface ModalContentProps extends ModalWrapperProps {
  initialStyle: ModalStyle;
  finalStyle: ModalStyle;
  picture: string;
}

export const ModalWrapper = styled.div<ModalWrapperProps>`
  position: fixed;
  top: 0;
  left: 0;
  transition: all 0.05s ease-in-out;
  ${({ opened }) => opened ? `
    opacity: 1;
    width: 100vw;
    height: 100vh;
    z-index: 1000000;
    
  ` : `
    opacity: 0;
    width: 0;
    height: 0;
    z-index: 1000000;
  `}
`;

export const ModalClickable = styled(ModalWrapper)`

`;

export const ModalContent = styled.div<ModalContentProps>`
  position: absolute;
  z-index: 1000001;
  background-size: cover;
  background-image: url("${({ picture }) => picture}");
  transition: all 0.25s ease-in-out;
  ${({ opened, initialStyle, finalStyle }) => opened ? `
    top: ${finalStyle.top};
    left: ${finalStyle.left};
    width: ${finalStyle.width};
    height: ${finalStyle.height};
    border: solid 2px #FCFCFC;
    border-radius: 2px;
    box-shadow: 2px 2px rgba(0, 0, 0, 0.1), 0 0 2px rgba(0, 0, 0, 0.2);
    cursor: normal;
  ` : `
    top: ${initialStyle.top};
    left: ${initialStyle.left};
    width: ${initialStyle.width};
    height: ${initialStyle.height};
    border: solid 0px #FCFCFC;
    border-radius: 0px;
    box-shadow: 0px 0px rgba(0, 0, 0, 0), 0 0 0px rgba(0, 0, 0, 0);
    cursor: pointer;
  `}
  ${({ opened, theme, initialStyle }) => theme.media.mobile`
    top: ${opened ? '10vh' : initialStyle.top};
    left: ${opened ? '1rem' : initialStyle.left};
    width: ${opened ? "calc(100vw - 2rem)" : "90vw"};
    height: ${opened ? "calc(100vw - 2rem)" : "90vw"};
  `}
`;

export const ModalClose = styled.a`

`;