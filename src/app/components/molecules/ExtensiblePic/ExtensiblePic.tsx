import React, { FC, useContext, useCallback, useEffect, useRef } from 'react';
import { ModalContext } from 'app/contexts/ModalContext';
import { getHomotheticDimensions, toPixel } from 'app/utils/images';

interface ExtensiblePicProps {
  picture: string;
  width: string;
  height: string;
  targetWidth: string;
  targetHeight: string;
  className: string;
}

const ExtensiblePic: FC<ExtensiblePicProps> = ({ children, className, picture }) => {
  const picHandlerRef = useRef<HTMLDivElement>(null);
  const { dispatch } = useContext(ModalContext);
  const open = useCallback(() => {
    dispatch({
      type: "open"
    });
  }, [dispatch]);

  const defineModaleClickableZone = useCallback(() => {
    const rect = picHandlerRef.current.getBoundingClientRect();
    const pics = picHandlerRef.current.getElementsByTagName('img');
    if (!pics.length) return;
    const pic = pics[0];
    const { picWidth, picHeight } = getHomotheticDimensions(pic, 0.9);
    dispatch({
      type: "create",
      payload: {
        picture,
        initialStyle: {
          width: toPixel(pic.width),
          height: toPixel(pic.height),
          top: toPixel(rect.top),
          left: toPixel(rect.left)
        },
        finalStyle: {
          width: toPixel(picWidth),
          height:toPixel(picHeight),
          top: "5vh",
          left: `calc(50vw - ${picWidth / 2}px)`
        }
      }
    });
  }, [picHandlerRef.current, dispatch, picture]);

  useEffect(() => {
    if (picHandlerRef.current) {
      picHandlerRef.current.removeEventListener('mouseenter', defineModaleClickableZone, true);
      picHandlerRef.current.addEventListener('mouseenter', defineModaleClickableZone, true);
    }
    return () => {
      picHandlerRef.current && picHandlerRef.current.removeEventListener('mouseenter', defineModaleClickableZone, true);
    }
  }, [picHandlerRef.current, defineModaleClickableZone, picture, dispatch]);

  useEffect(() => () => {
    dispatch({
      type: 'unmount'
    })
  }, []);
  return (
    <div className={className} ref={picHandlerRef} onClick={open}>
      {children}
    </div>
  )
}

export default ExtensiblePic;