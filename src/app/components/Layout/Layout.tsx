import React, { lazy, Suspense, memo, useContext } from 'react';
import { Background } from 'app/components/SharedStyled';
import { ModalContext } from 'app/contexts/ModalContext';

const ChildrenHandler = lazy(() => import('./ChildrenHandler'));

export const Layout = memo(
  ({ children }): JSX.Element => {
    const { state } = useContext(ModalContext);
    return (
      <Suspense fallback={<Background />}>
        <Background
          mounted={state.mounted}
          isBlurred={state.opened && state.mounted}
        >
          <ChildrenHandler children={children} />
        </Background>
      </Suspense>
    );
  }
);
