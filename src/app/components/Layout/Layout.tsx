import React, { lazy, Suspense, memo, useContext } from 'react';
import { Bg } from './Layout.styled';
import { Background } from 'app/components/SharedStyled';
import { ModalContext } from 'app/contexts/ModalContext';

const BackgroundVideo = lazy(() => import('app/components/atoms/BackgroundVideo'));
const ChildrenHandler = lazy(() => import('./ChildrenHandler'));

export const Layout = memo(({ children }): JSX.Element => {
  const { state } = useContext(ModalContext);
  return (
  <Suspense fallback={<Background />}>
    <Background isBlurred={state.opened && state.mounted}>
        <Bg children={<BackgroundVideo />} />
      <ChildrenHandler children={children} />
    </Background>
  </Suspense>
  )
});
