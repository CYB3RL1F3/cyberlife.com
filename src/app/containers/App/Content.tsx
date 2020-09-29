import React, { FC, useEffect, useRef } from 'react';
import { Content as Container } from './App.styled';
import { observer } from 'mobx-react';
import { sizes } from 'app/theme';
import { useRouterStore } from 'app/hooks/stores';
import { useBooleanDelaySwitch, useUnmount } from 'app/hooks/effects';

export const Content: FC = observer(
  ({ children }) => {
    const initiated = useBooleanDelaySwitch(1500);
    const contentHandler = useRef(null);
    const routerStore = useRouterStore();
    const isTabletOrDesktop = () =>
      window && window.document.body.clientWidth > sizes.mobile;
    useEffect(() => {
      if (isTabletOrDesktop() && routerStore.location.pathname)
        contentHandler.current.scrollTop = 0;
    }, [
      isTabletOrDesktop,
      contentHandler.current,
      routerStore.location.pathname,
    ]);
    if (isTabletOrDesktop())
      console.log('navigate to ', routerStore.location.pathname);

    useUnmount(() => {
      contentHandler.current = false;
    });

    const className = initiated ? 'loaded' : '';

    return (
      <Container className={className} id="pageContainer" ref={contentHandler}>
        {children}
      </Container>
    );
  }
);
