import React, { FC, useContext, useCallback, useEffect, useRef } from 'react';
import { useUnmount } from 'app/hooks/effects';
import { ModalContext } from 'app/contexts/ModalContext';

interface ExtensiblePicProps {
  picture: string;
  width: string;
  height: string;
  targetWidth: string;
  targetHeight: string;
  className: string;
}

const ExtensiblePic: FC<ExtensiblePicProps> = ({ children, className, picture, width, height, targetWidth, targetHeight }) => {
  const picHandlerRef = useRef<HTMLDivElement>(null);
  const { dispatch } = useContext(ModalContext);
  const open = useCallback(() => {
    dispatch({
      type: "open"
    });
  }, [dispatch]);

  const defineModaleClickableZone = useCallback(() => {
    console.log('mouseenter');
    const rect = picHandlerRef.current.getBoundingClientRect();
    dispatch({
      type: "create",
      payload: {
        picture,
        initialStyle: {
          width,
          height,
          top: `${rect.top}px`,
          left: `${rect.left}px`
        },
        finalStyle: {
          width: targetWidth,
          height: targetHeight,
          top: "5vh",
          left: `calc(50vw - ${parseInt(targetWidth) / 2}px)`
        }
      }
    });
  }, [picHandlerRef.current, dispatch, picture]);

  useUnmount(() => {
    console.log('unmount');
    picHandlerRef.current.removeEventListener('mouseenter', defineModaleClickableZone, true);

    dispatch({
      type: 'unmount'
    })
  })
  useEffect(() => {
    if (picHandlerRef.current) {
      picHandlerRef.current.removeEventListener('mouseenter', defineModaleClickableZone, true);
      picHandlerRef.current.addEventListener('mouseenter', defineModaleClickableZone, true);
    }
  }, [picHandlerRef.current, defineModaleClickableZone, picture, dispatch]);

  return (
    <div className={className} ref={picHandlerRef} onClick={open}>
      {children}
    </div>
  )
}

export default ExtensiblePic;