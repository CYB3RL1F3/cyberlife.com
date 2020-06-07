import React, { FC, useCallback, useContext } from "react";
import { ModalWrapper, ModalContent, ModalClickable } from "./Modal.styled";
import { ModalContext } from 'app/contexts/ModalContext';

const Modal: FC = () => {
  const { state, dispatch } = useContext(ModalContext);
  const { picture, initialStyle, finalStyle, onClose, opened, mounted } = state;
  const close = useCallback(() => {
    onClose();
    dispatch({
      type: "close"
    });
  }, [onClose, dispatch]);
  const open = useCallback(() => {
    dispatch({
      type: "open"
    });
  }, [dispatch]);
  console.log("MNTD => ", mounted);
  if (!mounted) return null;
  return (
    <ModalWrapper opened={opened && mounted}>
      <ModalClickable id="zou" opened={mounted && opened} onClick={close} />
      <ModalContent
        onClick={open}
        opened={opened} 
        initialStyle={initialStyle} 
        finalStyle={finalStyle}
        picture={picture}
      />
    </ModalWrapper>
  );
}

export default Modal;