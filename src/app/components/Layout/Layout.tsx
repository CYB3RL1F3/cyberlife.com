import React, { lazy, Suspense, memo } from 'react';
import { Background, Bg } from './Layout.styled';

const BackgroundVideo = lazy(() => import('app/components/atoms/BackgroundVideo'));
const ChildrenHandler = lazy(() => import('./ChildrenHandler'));

export const Layout = memo(({ children }): JSX.Element => (
  <Suspense fallback={<Background />}>
    <Background>
        <Bg children={<BackgroundVideo />} />
      <ChildrenHandler children={children} />
    </Background>
  </Suspense>
));
