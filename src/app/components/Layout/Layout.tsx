import React, { lazy, Suspense } from 'react';
import { Background, Bg } from './Layout.styled';

/*
import { BackgroundVideo } from 'app/components/atoms';
import { ChildrenHandler } from './ChildrenHandler';
*/
const BackgroundVideo = lazy(() => import('app/components/atoms/BackgroundVideo'));
const ChildrenHandler = lazy(() => import('./ChildrenHandler'));

export const Layout = ({ children }): JSX.Element => (
  <Suspense fallback={<Background />}>
    <Background>
        <Bg children={<BackgroundVideo />} />
      <ChildrenHandler children={children} />
    </Background>
  </Suspense>
);
