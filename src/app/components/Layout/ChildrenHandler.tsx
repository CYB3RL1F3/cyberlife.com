import React, { FC, useLayoutEffect, useMemo, useRef } from 'react';
import { ChildrenHandler as Container } from './Layout.styled';
import { observer } from 'mobx-react';
import { sizes } from 'app/theme';

export const ChildrenHandler: FC = observer(({ children }) => {
  const contentHandler = useRef<HTMLDivElement>();
  
  const isMobile = useMemo((): boolean =>
    window && window.document.body.clientWidth <= sizes.mobile, []);
  useLayoutEffect(() => {
    if (isMobile) contentHandler.current.scrollTop = 0
  }, [isMobile, contentHandler.current]);
  return (
    <Container ref={contentHandler} children={children} />
  );
});

export default ChildrenHandler;